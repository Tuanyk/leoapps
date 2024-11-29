import SlugifyForm from './SlugifyForm'

export default function SlugifyTool() {
  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Slugify Text Tool</h1>
      <SlugifyForm />
    </main>
  )
}

