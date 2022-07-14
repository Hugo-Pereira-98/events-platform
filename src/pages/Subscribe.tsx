import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import {
  useCreateSubscriberMutation,
  useGetLessonSlugQuery,
} from "../graphql/generated";

export default function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data } = useGetLessonSlugQuery();

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();

    if (!data) return;

    await createSubscriber({
      variables: {
        name,
        email,
      },
    });

    const [firstLesson] = data.lessons;

    navigate(`/event/lesson/${firstLesson.slug}`);
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center px-4">
      <div className="w-full max-w-[1100px] flex flex-col items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Esta é uma{" "}
            <strong className="text-blue-500">playlist completa</strong>, com as
            melhores músicas da atualidade no{" "}
            <strong className="text-blue-500">Brasil</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana acompanhando as aulas você vai aprender o que é
            música de verdade, ter assunto com homens de bem e, quem sabe,
            talvez ainda creça um cabelinho no seu peito.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-900 rounded px-5 h-14"
              placeholder="Seu nome completo"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-900 rounded px-5 h-14"
              placeholder="Digite seu e-mail"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              onClick={() => navigate("/event")}
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
