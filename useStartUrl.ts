import open from "open";

async function useStartUrl() {
  const startUrl = Bun.env.START_URL;

  if (typeof startUrl !== "undefined") open(startUrl);
}

useStartUrl();
