import Layout from "../../components/layout/Layout";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";
const newMeetup = (props) => {
  const router = useRouter();
  async function newMeetUpFormHandler(newMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }
  return (
    <Layout>
      <Head>
        <title>Meetup Form</title>
        <meta
          name="description"
          content="Add upcoming web3 events"
        />
      </Head>
      <NewMeetupForm onAddMeetup={newMeetUpFormHandler} />
    </Layout>
  );
};
export default newMeetup;
