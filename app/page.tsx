// app/page.tsx or wherever your Home component is
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/get-product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            website_url: "https://sashakorovkina2003.wixsite.com/my-site/product-page/i-m-a-product-15",
          }),
        });
        

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        {loading && <p>Loading product data...</p>}

        {product && (
  <>
    <Card className="w-[300px]">
      <CardContent className="flex flex-col items-center gap-4 p-4">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.title || "Product Image"}
            width={200}
            height={200}
            className="rounded-lg"
          />
        )}
        <CardTitle className="text-center text-xl">{product.title}</CardTitle>
        <CardDescription className="text-center">{product.description}</CardDescription>
        <p className="font-bold text-lg">{product.price}</p>
        <Button variant="default">Buy Now</Button>
      </CardContent>
    </Card>

    {/* Raw JSON Output */}
    <pre className="mt-6 p-4 bg-gray-100 rounded text-sm max-w-xl overflow-x-auto">
      {JSON.stringify(product, null, 2)}
    </pre>
  </>
        )}
      </main>
    </div>
  );
}
