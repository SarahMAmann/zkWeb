import Link from "next/link";

const proofs = [
  {
    id: 1,
    name: "My First Proof",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    createdOn: {
      date: "December 13, 2022",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Overdue",
    },
  },
  {
    id: 2,
    name: "Proof #2",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    createdOn: {
      date: "January 22, 2023",
      dateTime: "2023-01-22",
      amount: "$14,000.00",
      status: "Paid",
    },
  },
  {
    id: 3,
    name: "Proof #3",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    createdOn: {
      date: "January 23, 2023",
      dateTime: "2023-01-23",
      amount: "$7,600.00",
      status: "Paid",
    },
  },
  {
    id: 4,
    name: "Proof #4",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    createdOn: {
      date: "January 23, 2023",
      dateTime: "2023-01-23",
      amount: "$7,600.00",
      status: "Paid",
    },
  },
  {
    id: 5,
    name: "Proof #5",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    createdOn: {
      date: "January 23, 2023",
      dateTime: "2023-01-23",
      amount: "$7,600.00",
      status: "Paid",
    },
  },
  {
    id: 6,
    name: "Proof #6",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    createdOn: {
      date: "January 23, 2023",
      dateTime: "2023-01-23",
      amount: "$7,600.00",
      status: "Paid",
    },
  },
];

export default function GridCards() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {proofs.map((proof) => (
        <Link
          href={{
            pathname: `/prover/[id]`,
            query: {
              id: proof.id,
            },
          }}
          as={`/prover/${proof.id}`}
          key={proof.id}
        >
          <li
            key={proof.id}
            className="overflow-hidden rounded-xl border border-gray-200"
          >
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <img
                src={proof.imageUrl}
                alt={proof.name}
                className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
              />
              <div className="text-sm font-medium leading-6 text-gray-900">
                {proof.name}
              </div>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created on:</dt>
                <dd className="text-gray-700">
                  <time dateTime={proof.createdOn.dateTime}>
                    {proof.createdOn.date}
                  </time>
                </dd>
              </div>
            </dl>
          </li>
        </Link>
      ))}
    </ul>
  );
}
