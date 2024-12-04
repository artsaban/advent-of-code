export async function readLines(): Promise<string[]> {
  return (await readAll()).split("\n");
}

export async function readAll(): Promise<string> {
  return (await new Response(Deno.stdin.readable).text()).trim();
}
