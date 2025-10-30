"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser,
  faEnvelope,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

export default function FAQ() {
  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    mensagem: Yup.string().required("Mensagem é obrigatória")
  });

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      mensagem: ""
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Dados do formulário:", values);
      alert("Mensagem enviada! Verifique o console.");
      formik.resetForm();
    }
  });

  const faqs = [
    {
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Perguntas <span className="text-green-700">Frequentes</span>
          </h1>
          <p className="text-gray-600">
            Encontre respostas para as dúvidas mais comuns
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-6 border-b border-gray-200 last:border-b-0">
                <div className="flex items-start gap-3 mb-3">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {faq.pergunta}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed ml-8">
                  {faq.resposta}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Envie sua Dúvida
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-green-700" />
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={formik.values.nome}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Seu nome"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700"
              />
              {formik.touched.nome && formik.errors.nome && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.nome}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-green-700" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="seu@email.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faCommentDots} className="mr-2 text-green-700" />
                Mensagem
              </label>
              <textarea
                name="mensagem"
                value={formik.values.mensagem}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Digite sua dúvida..."
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700"
              />
              {formik.touched.mensagem && formik.errors.mensagem && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.mensagem}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}