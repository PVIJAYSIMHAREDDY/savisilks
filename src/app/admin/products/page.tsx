import { getServerSupabase } from '@/lib/supabase'
import { createProduct, updateProduct, deleteProduct } from './actions'

export default async function ProductsPage() {
  const supabase = getServerSupabase()
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, description, price, stock, image_url, is_published, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-6 text-red-600">Failed to load products: {error.message}</div>
  }

  return (
    <section className="p-6 space-y-8">
      <h2 className="text-xl font-semibold">Products</h2>

      <div className="border rounded p-4">
        <h3 className="font-medium mb-3">Create Product</h3>
        <form action={createProduct} className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input name="name" placeholder="Name" required className="border rounded p-2" />
          <input name="price" placeholder="Price (e.g., 49.99)" type="number" step="0.01" required className="border rounded p-2" />
          <input name="stock" placeholder="Stock" type="number" required className="border rounded p-2" />
          <input name="image_url" placeholder="Image URL" className="border rounded p-2" />
          <textarea name="description" placeholder="Description" className="border rounded p-2 md:col-span-2" />
          <label className="inline-flex items-center gap-2 md:col-span-2">
            <input type="checkbox" name="is_published" /> <span>Published</span>
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="rounded bg-black text-white px-4 py-2">Create</button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {products?.map(p => (
          <div key={p.id} className="border rounded p-4">
            <div className="flex items-start gap-4">
              {p.image_url ? <img src={p.image_url} alt={p.name} className="w-24 h-24 object-cover rounded" /> : null}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{p.name}</h3>
                  <span className="text-xs px-2 py-1 rounded border">
                    {p.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{p.description}</p>
                <p className="text-sm mt-1">Price: ${p.price?.toFixed?.(2)} • Stock: {p.stock}</p>
              </div>
            </div>

            <details className="mt-3">
              <summary className="cursor-pointer text-sm underline">Edit</summary>
              <form action={updateProduct} className="grid grid-cols-1 gap-3 md:grid-cols-2 mt-3">
                <input type="hidden" name="id" defaultValue={p.id} />
                <input name="name" defaultValue={p.name} required className="border rounded p-2" />
                <input name="price" defaultValue={p.price} type="number" step="0.01" required className="border rounded p-2" />
                <input name="stock" defaultValue={p.stock} type="number" required className="border rounded p-2" />
                <input name="image_url" defaultValue={p.image_url ?? ''} className="border rounded p-2" />
                <textarea name="description" defaultValue={p.description ?? ''} className="border rounded p-2 md:col-span-2" />
                <label className="inline-flex items-center gap-2 md:col-span-2">
                  <input type="checkbox" name="is_published" defaultChecked={p.is_published} /> <span>Published</span>
                </label>
                <div className="md:col-span-2 flex gap-2">
                  <button type="submit" className="rounded bg-black text-white px-4 py-2">Save</button>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" defaultValue={p.id} />
                    <button type="submit" className="rounded border px-4 py-2">Delete</button>
                  </form>
                </div>
              </form>
            </details>
          </div>
        ))}
      </div>
    </section>
  )
}
