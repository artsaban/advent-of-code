export async function readLines(): Promise<string[]> {
  return (await new Response(Deno.stdin.readable).text()).trim().split("\n");
}
