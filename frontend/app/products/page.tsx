export default async function ProductsPage() {
  // Fetch products from Strapi
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const res = await fetch(`${strapiUrl}/api/products?populate=image`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
        ? `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        : undefined,
    },
    cache: 'no-store', // Ensure fresh data
  });

  if (!res.ok) {
    console.error('Failed to fetch products:', res.status, res.statusText);
    return <div className="text-center text-red-600 py-16">Failed to load products.</div>;
  }

  const { data } = await res.json();

  // Log the full response for debugging
  console.log('Strapi Products Response:', JSON.stringify(data, null, 2));

  // Check if data is empty or not an array
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('No products found in Strapi response');
    return <div className="text-center text-gray-600 py-16">No products available.</div>;
  }

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <main className="py-16 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-red-600 mb-12 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Our Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((product) => {
              // Construct image URL (handle both single and multiple media)
              let imageUrl = null;
              if (product.image) {
                if (Array.isArray(product.image) && product.image.length > 0) {
                  // Multiple media: use the first image
                  imageUrl = product.image[0].url ? `${strapiUrl}${product.image[0].url}` : null;
                } else if (product.image.url) {
                  // Single media: use the url directly
                  imageUrl = `${strapiUrl}${product.image.url}`;
                }
              }

              // Log image details for debugging
              console.log(`Product: ${product.name}`);
              console.log(`Image data:`, product.image);
              console.log(`Constructed Image URL: ${imageUrl}`);
              console.log(`Test this URL in your browser: ${imageUrl}`);

              return (
                <div
                  key={product.id}
                  className="border rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative w-full aspect-[1/2] mb-4">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain rounded-md"
                      />
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                        No Image Available
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 text-center">{product.name}</h2>
                  <p className="text-gray-600 mt-2 text-center line-clamp-2">
                    {product.description?.[0]?.children?.[0]?.text || 'No description available.'}
                  </p>
                  <p className="text-red-600 font-bold mt-2 text-center">${product.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}