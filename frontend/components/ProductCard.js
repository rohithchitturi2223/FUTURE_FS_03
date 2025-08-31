export default function ProductCard({ title, description, imageUrl }) {
  return (
    <div className="border p-4 rounded-xl shadow-md bg-white">
      <img src={imageUrl} alt={title} className="rounded-xl mb-2 w-full h-40 object-cover" />
      <h3 className="font-bold text-xl">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
