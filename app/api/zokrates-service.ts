import {
  CompilationArtifacts,
  Proof,
  SetupKeypair,
  initialize,
} from "zokrates-js";

export async function generateProof(value: string) {
  try {
    const proof = await initialize().then((zokratesProvider) => {
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

      const output1 = outputArray[0].trim();
      const output2 = outputArray[1].trim();

      // output string length could be 39 or 38 digits (we use 41 because the quotes are counted)
      const output1Length = output1.length === 41 ? 4 : 3;
      const output2Length = output2.length === 41 ? 4 : 3;

      // The outputs need to be of a number type, but they are too large for
      // JavaScript so we have to split them up in smaller chunks
      let firstOutputSegmentOne;
      let firstOutputSegmentTwo;
      let firstOutputSegmentThree;
      let firstOutputSegmentFour;

      // In JavaScript, when you convert a string to a number using Number(),
      // it will automatically remove any leading zeros, so we account for any substrings
      // that start with a zero by multiplying the previous segment by 10
      firstOutputSegmentOne = Number(
        output1.substr(0, 10).replace(/"/g, "").trim(),
      );

      firstOutputSegmentTwo = Number(
        output1.substr(10, 13).replace(/"/g, "").trim(),
      );
      if (output1.substr(10, 13)[0] === "0") {
        firstOutputSegmentOne = firstOutputSegmentOne * 10;
      }

      firstOutputSegmentThree = Number(
        output1.substr(23, 13).replace(/"/g, "").trim(),
      );
      if (output1.substr(23, 13)[0] === "0") {
        firstOutputSegmentTwo = firstOutputSegmentTwo * 10;
      }

      firstOutputSegmentFour = Number(
        output1.substr(36, output1Length).replace(/"/g, "").trim(),
      );
      if (output1.substr(36, output1Length)[0] === "0") {
        firstOutputSegmentThree = firstOutputSegmentThree * 10;
      }

      let secondOutputSegmentOne;
      let secondOutputSegmentTwo;
      let secondOutputSegmentThree;
      let secondOutputSegmentFour;

      secondOutputSegmentOne = Number(
        output2.substr(0, 10).replace(/"/g, "").trim(),
      );

      secondOutputSegmentTwo = Number(
        output2.substr(10, 13).replace(/"/g, "").trim(),
      );
      if (output2.substr(10, 13)[0] === "0") {
        secondOutputSegmentOne = secondOutputSegmentOne * 10;
      }

      secondOutputSegmentThree = Number(
        output2.substr(23, 13).replace(/"/g, "").trim(),
      );
      if (output2.substr(23, 13)[0] === "0") {
        secondOutputSegmentTwo = secondOutputSegmentTwo * 10;
      }

      secondOutputSegmentFour = Number(
        output2.substr(36, output2Length).replace(/"/g, "").trim(),
      );
      if (output2.substr(36, output2Length)[0] === "0") {
        secondOutputSegmentThree = secondOutputSegmentThree * 10;
      }

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
  value: string,
) {
  try {
    const verifier = await initialize().then((zokratesProvider) => {
      // second computation
      // const { witness, output } = zokratesProvider.computeWitness(artifacts, [
      //   "0",
      //   "0",
      //   "0",
      //   value,
      // ]);
      // console.log("NEW WITNESS", witness);

      // // run setup
      // const keypair = zokratesProvider.setup(artifacts.program);
      // console.log("NEW KEYPAIR", keypair);

      // // generate proof
      // const generatedProof = zokratesProvider.generateProof(
      //   artifacts.program,
      //   witness,
      //   keypair.pk,
      // );
      // console.log("PROOF", generatedProof);

      // return { proof: generatedProof, keypair: keypair };
      return {}
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
      console.log("IS VERIFIED>", zokratesVerified);
      return zokratesVerified;
    });

    return isVerified;
  } catch (e) {
    console.log(e);
  }
}
