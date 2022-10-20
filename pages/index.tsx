import Head from "next/head";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="mx-w-7xl mx-auto">
      <Head>
        <title>Mace Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:p-0 ">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Mace
            </span>{" "}
            Blogs, the only place to write, read and connect with the best
            community
          </h1>
          <h2>
            It's easy and free to post, while connecting with our comunity
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="Logo"
        ></img>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    descriptions,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
