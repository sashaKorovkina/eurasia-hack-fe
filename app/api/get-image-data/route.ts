// app/api/get-image-data/route.ts
export async function POST(req: Request) {
    const { website_url } = await req.json();
  
    try {
      const response = await fetch("https://eurasia-hack-373909085987.europe-west2.run.app/get_image_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website_url }),
      });
  
      if (!response.ok) {
        return new Response("Upstream API error", { status: 502 });
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response("Internal proxy error", { status: 500 });
    }
  }
  