import getStudyMaterial from "../../lib/getStudyMaterial";
import QuizClient from "./quizClient";

export default async function Quiz() {
  const studyMaterial = await getStudyMaterial();

  if (!studyMaterial) {
    return <p>No quiz available.</p>;
  }

  return <QuizClient quiz={studyMaterial.quiz} />;
}