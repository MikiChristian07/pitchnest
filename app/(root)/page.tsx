import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <>

      <section className="green_container">
        <h1 className="heading">Showcase your startup. Connect. Grow. Disrupt.</h1>
        <p className="sub-heading !max-w-3xl">
          Share your ideas, vote on pitches, and shine in virtual competitions.
        </p>
        <SearchForm />
        
      </section>

    </>
  );
}
