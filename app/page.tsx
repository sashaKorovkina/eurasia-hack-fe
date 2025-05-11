// app/page.tsx or wherever your Home component is
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

export default function Home() {
  const [product, setProduct] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
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

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/get-image-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            website_url: "https://sashakorovkina2003.wixsite.com/my-site/product-page/i-m-a-product-15",
          }),
        });
        

        const data = await response.json();
        setImage(data);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (product || image) {
      const dataToCopy = product || image;
      navigator.clipboard.writeText(JSON.stringify(dataToCopy, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };  

  const handleDownload = () => {
    if (product || image) {
      const blob = new Blob([JSON.stringify(product, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "product.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };


  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="p-6 bg-gray-800 text-white text-xl font-semibold shadow">
        Product Viewer
      </header>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-8">
        {/* JSON Output Card on the Left */}
        <Card className="overflow-auto max-h-[80vh]">
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Raw Product Data</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading product data...</p>
            ) : product ? (
              <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(product, null, 2)}</pre>
            ) : (
              <p>No product data available.</p>
            )}
          </CardContent>
        </Card>

        {/* Image Output Card on the Right */}
        <Card className="overflow-auto max-h-[80vh]">
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Inferred Product Data</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading image data...</p>
            ) : image ? (
              <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(image, null, 2)}</pre>
            ) : (
              <p>No image data available.</p>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
  
}
