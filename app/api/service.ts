import {
  CompilationArtifacts,
  Proof,
  SetupKeypair,
  initialize,
} from "zokrates-js";

export async function generateProof(value: string) {
  try {
    const proof = await initialize().then((zokratesProvider) => {
      // 1691170819990

      const code =
        'import "hashes/sha256/512bitPacked" as sha256packed; def main(private field a, private field b, private field c, private field d) -> field[2] { field[2] mut h = sha256packed([a, b, c, d]); return h; }';
      // compilation
      const artifacts = zokratesProvider.compile(code);
      console.log("ARTIFACTS", artifacts);

      // computation
      const { witness, output } = zokratesProvider.computeWitness(artifacts, [
        "0",
        "0",
        "0",
        value,
      ]);
      console.log("WITNESS", witness); // Resulting witness which can be used to generate a proof
      console.log("OUTPUT", output); // Computation output

      const outputRemovedBrackets = output.replace(/[\[\]']+/g, "");
      let outputArray = outputRemovedBrackets.split(",");

      // The outputs need to be of a number type, but they are too large for
      // JavaScript so we have to split them up in smaller chunks
      const output1 = outputArray[0].trim();
      const output2 = outputArray[1].trim();

      // output string length could be 39 or 38 digits (we use 41 because the quotes are counted)
      // we should also make sure user input is controlled (positive numbers, max, etc)
      // to prevent any odd outlying string lengths
      const output1Length = output1.length === 41 ? 4 : 3;
      const output2Length = output2.length === 41 ? 4 : 3;

      const firstOutputSegmentOneSlice = output1.substr(0, 10).replace('"', "");
      const strippedWhitespace = firstOutputSegmentOneSlice.trim();
      const firstOutputSegmentOne = Number(strippedWhitespace);

      const firstOutputSegmentTwo = Number(output1.substr(10, 13));
      const firstOutputSegmentThree = Number(output1.substr(23, 13));
      const firstOutputSegmentFour = Number(output1.substr(36, output1Length));

      const secondOutputSegmentOneSlice = output2
        .substr(0, 10)
        .replace('"', "");
      const strippedWhitespaceSecond = secondOutputSegmentOneSlice.trim();
      const secondOutputSegmentOne = Number(strippedWhitespaceSecond);

      const secondOutputSegmentTwo = Number(output2.substr(10, 13));
      const secondOutputSegmentThree = Number(output2.substr(23, 13));
      const secondOutputSegmentFour = Number(output2.substr(36, output2Length));

      const codeWithAssertion = `import \"hashes/sha256/512bitPacked\" as sha256packed; def main(private field a, private field b, private field c, private field d) -> field[2] { field[2] mut h = sha256packed([a, b, c, d]); assert(h[0] == ${firstOutputSegmentOne}${firstOutputSegmentTwo}${firstOutputSegmentThree}${firstOutputSegmentFour}); assert(h[1] == ${secondOutputSegmentOne}${secondOutputSegmentTwo}${secondOutputSegmentThree}${secondOutputSegmentFour}); return h; }`;

      // second compilation
      const artifactsWithAssertion =
        zokratesProvider.compile(codeWithAssertion);
      console.log("ARTIFACTS_WITH_ASSERTION", artifactsWithAssertion);

      // split out the function for the second computation so we can re-declare
      // block scoped variables
      const verifierProof = generateProofAndSolidityCode(
        artifactsWithAssertion,
        value,
      );
      return verifierProof;
    });

    return proof;
  } catch (e) {
    console.log(e);
  }
}

async function generateProofAndSolidityCode(
  artifacts: CompilationArtifacts,
  date: string,
) {
  try {
    const verifier = await initialize().then((zokratesProvider) => {
      // second computation
      const { witness, output } = zokratesProvider.computeWitness(artifacts, [
        "0",
        "0",
        "0",
        date,
      ]);
      console.log("NEW WITNESS", witness);

      // run setup
      const keypair = zokratesProvider.setup(artifacts.program);
      console.log("NEW KEYPAIR", keypair);

      // generate proof
      const generatedProof = zokratesProvider.generateProof(
        artifacts.program,
        witness,
        keypair.pk,
      );
      console.log("PROOF", generatedProof);

      return { proof: generatedProof, keypair: keypair };
    });

    return verifier;
  } catch (e) {
    console.log(e);
  }
}

export async function verify(
  verificationKey: SetupKeypair,
  proof: Proof,
  inputs: Array<string>,
) {
  try {
    const isVerified = await initialize().then((zokratesProvider) => {
      proof.inputs = inputs;
      const zokratesVerified: boolean = zokratesProvider.verify(
        verificationKey,
        proof,
      );
      return zokratesVerified;
    });

    return isVerified;
  } catch (e) {
    console.log(e);
  }
}
