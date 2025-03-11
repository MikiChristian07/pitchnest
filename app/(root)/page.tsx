import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

type StartupCardType = {
  _id: string;
  _createdAt: string;
  views: number;
  author: { id: string; name: string };
  title: string;
  category: string;
  image?: string;
  description?: string;
};

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const params = await searchParams; // Wait for the search params
  const query = params?.query || "";

  const posts = await client.fetch(STARTUPS_QUERY);

  console.log(JSON.stringify(posts));

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

        <ul className="mt-7 card-grid">
          {posts.length > 0 ? (
            posts.map((post: StartupCardType) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p className="no-results" key="no_result">
              No results found
            </p>
          )}
        </ul>
      </section>
    </>
  );
}
