import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ 
  searchParams,
}: { 
  searchParams: Promise<{ query?: string }> 
}) {
  const query = (await searchParams).query;
  const params  = { search: query || null };

  const session = await auth();

  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params  });

  return (
    <>
      <section className="green_container">
        <h1 className="heading">Showcase your startup. Connect. Grow. Disrupt.</h1>
        <p className="sub-heading !max-w-3xl">
          Share your ideas, vote on a pitch, and shine in virtual competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post: StartupTypeCard) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p className="no-results" key="no_result">
              No results found
            </p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}