import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{query?: string }>
}) {

  const query = (await searchParams).query

  const posts = [{
    _createdAt: new Date(),
    views: 55,
    author: { _id : 1, name : 'Chris'},
    description: 'This is a sample description',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RhcnR1cHxlbnwwfHwwfHx8MA%3D%3D',
    category: 'Blockchain',
    title: 'Decenti-Firm',
  }]

  return (
    <>

      <section className="green_container">
        <h1 className="heading">Showcase your startup. Connect. Grow. Disrupt.</h1>
        <p className="sub-heading !max-w-3xl">
          Share your ideas, vote on pitches, and shine in virtual competitions.
        </p>
        <SearchForm query={query}/>
        
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>

        <ul className="mt-7 card-grid">
          {
            posts?.length > 0 ? (
              posts.map((post : StartupCardType, index: number) => (
                <StartupCard key={post?._id} post={post} />
              ))

            ) :
              <p className="no-results">No results found</p>
          }
        </ul>
      </section>

    </>
  );
}
