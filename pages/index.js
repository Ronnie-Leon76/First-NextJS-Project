import Layout from "../components/layout/Layout";
import MeetUpList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <Layout>
      <Head>
        <title>Web3 Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of active Web3 sessions"
        />
      </Head>
      <MeetUpList meetups={props.meetups} />
    </Layout>
  );
};
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export async function getStaticProps() {
  // fetch data from an API or database
  const client = await MongoClient.connect(
    "mongodb+srv://Ronnie:ukRrz2ta4TNBOClx@cluster0.xkrj2.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
