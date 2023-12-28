export default function GenerateButton() {
  return (
    <div className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border">
      <svg
        aria-label="Vercel logomark"
        role="img"
        viewBox="0 0 74 64"
        className="h-4 w-4 mr-2"
      >
        <path
          d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
          fill="currentColor"
        ></path>
      </svg>
      Generate A Proof
    </div>
  );
}
