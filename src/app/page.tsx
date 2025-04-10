"use client";

import Image from "next/image";
import Card1Image from "../../public/images/card1-icon.svg"
import Card2Image from "../../public/images/card2.svg"
import Card3Image from "../../public/images/card3.svg"
import HeroImage from "../../public/images/1.png"
import ProductIllustration from "../../public/images/2.png"
import FormImage from "../../public/images/3.png"
import UserFlowImage from "../../public/images/4.png"
import Logo from "../../public/images/logo1.svg"
import WhiteLogo from "../../public/images/white-logo.svg"
import LogoExtended from "../../public/images/logo-extensa.svg"
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    specialty: '',
    otherSpecialty: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleScrollToForm = () => {
    const formSection = document.getElementById('form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            specialty: formData.specialty === 'outros' ? formData.otherSpecialty : formData.specialty,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        whatsapp: '', 
        specialty: '', 
        otherSpecialty: '' 
      });
    } catch (error) {
      console.error('Erro ao salvar inscrição:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f2f1f031]">
      {/* Navbar */}
      <nav className="pt-10">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-[1200px]">
          <div className="flex items-end gap-2">
            <Image src={Logo} alt="Dashboard" width={32}></Image>
            <Image src={LogoExtended} alt="Dashboard" width={56}></Image>
          </div>
          <button 
            onClick={handleScrollToForm}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm"
          >
            Inscreva-se
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-16 max-w-[1200px]">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="flex-1 space-y-6">
            <p className="text-lg text-gray-600 max-w-md">
              Fazendo malabarismo entre pacientes, supervisão, TCCs e ainda tentando postar no Insta? Calma, a gente resolve isso.
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Você não se tornou psicólogo pra virar designer, né?
            </h1>
          </div>

          <div className="flex-1">
            <div className="w-full h-[492px] relative">
              <Image 
                src={HeroImage} 
                alt="Dashboard" 
                width={1000} 
                height={1000}
                className="object-contain animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="bg-[#e8f8f4] py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="space-y-8">
            {/* Text and Illustration */}
            <div className="flex flex-col md:flex-row items-start gap-16">
              <div className="w-full md:w-1/3">
                <div className="w-full aspect-square">
                  {/* Placeholder para a ilustração do personagem */}
                  <div className="w-full">
                    <Image src={ProductIllustration} alt="Dashboard" width={1000} height={1000}></Image>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <p className="text-gray-800 text-lg leading-relaxed">
                  Com poucos cliques, você gera conteúdo bonito, estratégico e com a sua cara. E ainda sobra tempo pro cafezinho.
                  <br />Como funciona: <br />Você fala o que precisa. A gente faz mágica com IA e Canva.
                  <br />Quer carrossel? Post? Legenda que não pareça de robô? Pronto. Em minutos, você tem tudo isso com uma estética pensada pra psicólogos autênticos — nada de design genérico estilo PowerPoint 2007.
                  <br />Entra logo na lista VIP e garanta sua vaga por R$39,90 por mês no lançamento. Após o lançamento, o preço será de R$49,90/mês.
                </p>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="w-full mt-8">
              <div className="w-full aspect-[16/9] bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Placeholder para a imagem do dashboard */}
                <div className="w-full h-full bg-white border border-gray-100 rounded-xl p-4">
                  <div className="h-8 flex items-center gap-2 mb-4">
                    <div className="w-24 h-6 bg-gray-100 rounded"></div>
                    <div className="w-24 h-6 bg-gray-100 rounded"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-32 bg-gray-50 rounded-lg"></div>
                    <div className="h-32 bg-gray-50 rounded-lg"></div>
                    <div className="h-32 bg-gray-50 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 md:py-24 mb-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20">
            O que você ganha com o Content Boutique:
          </h2>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/2 h-[646px] bg-[#F1FFF8] rounded-xl"></div>

            <div className="w-full md:w-1/2 h-[646px] flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-start gap-8 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-xl w-1/3">Post Estratégico Sem Sofrimento</h3>
                  <p className="text-gray-600 flex-1">Não precisa saber copy, marketing ou design. A IA faz o trabalho pesado por você.</p>
                </div>

                <div className="flex items-start gap-8 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-xl w-1/3">Design que Fala por Você</h3>
                  <p className="text-gray-600 flex-1">Nossos pacotes do Canva são exclusivamente bonitos e transmitem sua vibe como psicólogo (acolhedor? direto ao ponto? calmo? geek? temos!).</p>
                </div>

                <div className="flex items-start gap-8 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-xl w-1/3">Tempo Livre Liberado!</h3>
                  <p className="text-gray-600 flex-1">Menos tempo criando post = mais tempo pra fazer nada ou fazer o que quiser.</p>
                </div>

                <div className="flex items-start gap-8 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-xl w-1/3">Conexão Real com Pacientes</h3>
                  <p className="text-gray-600 flex-1">Posts que não parecem genéricos = mais engajamento e mais consultas marcadas.</p>
                </div>

                <div className="flex items-start gap-8 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-xl w-1/3">Parar não é uma opção</h3>
                  <p className="text-gray-600 flex-1">Tanto os templates como os agente de IA, são constantemente atualizados para garantir que você tenha o melhor conteúdo.</p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <div className="text-right w-2/3">
                  <p className="text-gray-800 text-lg mb-6">
                    Nossa plataforma oferece uma forma simples e eficaz de criar conteúdo impactante e crescer no Instagram, sem complicações.
                  </p>
                  <button 
                    onClick={handleScrollToForm}
                    className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg"
                  >
                    Inscreva-se
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* A Day in the Life Section */}
      <section className="py-16 md:pb-4 md:pt-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* Title centered at the top */}
          <div className="flex items-center justify-center gap-4 mb-20">
            <Image
              src="/images/flow1.png"
              alt="Flow icon"
              width={80}
              height={80}
              className="object-contain"
            />
            <h2 className="text-4xl md:text-5xl font-bold">
              Seu Dia com a<br />
              Content Boutique
            </h2>
          </div>

          {/* Timeline content */}
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-12">
              {/* Timeline items */}
              <div className="flex-1">
                <div className="flex flex-col gap-10">
                  {/* 9 AM */}
                  <div className="flex gap-6 items-center border-b-4 border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-full w-[2px] bg-gray-200 my-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full -translate-x-[5px]"></div>
                      </div>
                      <div className="text-gray-400 text-2xl font-light w-16 text-right">9:00</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-lg">
                        Você clica em "gerar conteúdo"
                      </p>
                    </div>
                  </div>

                  {/* 9:01 AM */}
                  <div className="flex gap-6 items-center border-b-4 border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-full w-[2px] bg-gray-200 my-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full -translate-x-[5px]"></div>
                      </div>
                      <div className="text-gray-400 text-2xl font-light w-16 text-right">9:01</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-lg">
                        O conteúdo tá pronto.
                      </p>
                    </div>
                  </div>

                  {/* 9:02 AM */}
                  <div className="flex gap-6 items-center border-b-4 border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-full w-[2px] bg-gray-200 my-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full -translate-x-[5px]"></div>
                      </div>
                      <div className="text-gray-400 text-2xl font-light w-16 text-right">9:02</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-lg">
                        Você escolhe um de nossos templates e edita.
                      </p>
                    </div>
                  </div>

                  {/* 9:10 AM */}
                  <div className="flex gap-6 items-center border-b-4 border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-full w-[2px] bg-gray-200 my-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full -translate-x-[5px]"></div>
                      </div>
                      <div className="text-gray-400 text-2xl font-light w-16 text-right">9:10</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-lg">
                        Você posta e ainda sobra tempo pra um cafezinho.
                      </p>
                    </div>
                  </div>

                  {/* 17 PM */}
                  <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-4">
                      <div className="h-full w-[2px] bg-gray-200 my-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full -translate-x-[5px]"></div>
                      </div>
                      <div className="text-gray-400 text-2xl font-light w-16 text-right">17:00</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-lg">
                        Tá relaxado no sofá só olhando os comentários bombando.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image placeholder */}
              <div className="w-1/2 h-[500px]">
                <Image src={UserFlowImage} alt="Dashboard" height={500}></Image>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <button 
              onClick={handleScrollToForm}
              className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg"
            >
              Se inscreva agora
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 md:pb-24 md:pt-32">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col gap-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-16">
              <div className="md:w-1/2">
                <h2 className="text-5xl md:text-6xl font-bold">
                  Por que usar o<br />Content Boutique?
                </h2>
              </div>
              <div className="md:w-1/2">
                <p className="text-gray-800 text-lg leading-relaxed">
                  Porque seu tempo vale mais do que quebrar a cabeça no Canva todo dia.
                  Seu conteúdo precisa trabalhar por você. Com nossa IA e nossos templates únicos, você vira referência sem parecer uma marca genérica.
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F1FFF8] p-10 rounded-[32px] min-h-[280px] border-black border-2">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold">
                      Conteúdo Único
                    </h3>
                    <Image src={Card1Image} alt="Conteúdo Único" width={128}></Image>
                  </div>

                  <p className="text-gray-800 text-lg">
                    A nossa Inteligência artificial é treinada para criar <span className="font-semibold">roteiros originais e virais</span> que encanta seu público, trazendo mais engajamento e pacientes.
                  </p>
                </div>
              </div>

              <div className="bg-black text-white p-10 rounded-[32px] min-h-[280px]">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold">
                      Templates Exclusivos
                    </h3>
                    <Image src={Card2Image} alt="Team Accountability Framework" width={99}></Image>
                  </div>
                  <p className="text-lg">
                    Nossos templates são únicos, pois, são <span className="font-semibold">feitos do zero</span> por nossa especialista em design de posts para profissionais de saúde mental.
                  </p>
                </div>
              </div>

              <div className="bg-[#F1FFF8] p-10 rounded-[32px] min-h-[280px] border-black border-2">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold">
                      Nunca foi tão fácil
                    </h3>
                    <Image src={Card3Image} alt="Team Accountability Framework" width={99}></Image>
                  </div>
                  <p className="text-gray-800 text-lg">
                    Nossa plataforma está sendo desenvolvida por uma empresa especializada em Agentes de IA e experiência do usuário. Nosso objetivo é entregar para você <span className="font-semibold">uma plataforma intuitiva e fácil de usar</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                O que os psicólogos estão falando sobre o Content Boutique
              </h2>
              <p className="text-gray-800 text-lg">
                Veja como nossa plataforma está transformando a forma como psicólogos criam conteúdo para suas redes sociais.
              </p>
            </div>

            <div className="md:w-1/2 grid grid-cols-1 gap-6">
              <div className="bg-[#F1FFF8] p-8 rounded-[32px] border-2 border-black">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-xl">Dra. Ana Silva</h3>
                    <p className="text-gray-600">Psicóloga Clínica</p>
                  </div>
                </div>
                <p className="mt-4 text-lg">
                  "O Content Boutique mudou completamente minha presença digital. Agora consigo criar conteúdo de qualidade em minutos, e o melhor: meus pacientes amam!"
                </p>
              </div>

              <div className="bg-[#F1FFF8] p-8 rounded-[32px] border-2 border-black">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-xl">Dr. Carlos Mendes</h3>
                    <p className="text-gray-600">Psicólogo Organizacional</p>
                  </div>
                </div>
                <p className="mt-4 text-lg">
                  "Finalmente encontrei uma solução que entende as necessidades específicas de psicólogos. Os templates são incríveis e a IA realmente gera conteúdo relevante."
                </p>
              </div>

              <div className="bg-[#F1FFF8] p-8 rounded-[32px] border-2 border-black">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-xl">Dra. Mariana Costa</h3>
                    <p className="text-gray-600">Psicóloga Infantil</p>
                  </div>
                </div>
                <p className="mt-4 text-lg">
                  "Como psicóloga infantil, preciso de um conteúdo mais lúdico e acolhedor. O Content Boutique me ajuda a criar exatamente isso, com muito menos trabalho."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F1FFF8]">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Perguntas Frequentes
              </h2>
              <p className="text-gray-800 text-lg">
                Tire suas dúvidas sobre como o Content Boutique pode ajudar você a criar conteúdo de qualidade para suas redes sociais.
              </p>
            </div>

            <div className="md:w-1/2">
              <div className="space-y-4">
                <div className="bg-white rounded-[32px] border-2 border-black overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                  >
                    <h3 className="font-semibold text-xl">
                      Como funciona a geração de conteúdo?
                    </h3>
                    <span className="text-2xl">{activeFaq === 1 ? '−' : '+'}</span>
                  </button>
                  {activeFaq === 1 && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600">
                        Nossa IA analisa seu perfil e cria conteúdo personalizado baseado em sua especialidade e público-alvo. Você pode editar e personalizar o conteúdo gerado antes de publicar.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-[32px] border-2 border-black overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
                  >
                    <h3 className="font-semibold text-xl">
                      Os templates são realmente exclusivos?
                    </h3>
                    <span className="text-2xl">{activeFaq === 2 ? '−' : '+'}</span>
                  </button>
                  {activeFaq === 2 && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600">
                        Sim! Todos os templates são criados exclusivamente para psicólogos, com designs modernos e profissionais que transmitem credibilidade e acolhimento.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-[32px] border-2 border-black overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
                  >
                    <h3 className="font-semibold text-xl">
                      Posso cancelar minha assinatura quando quiser?
                    </h3>
                    <span className="text-2xl">{activeFaq === 3 ? '−' : '+'}</span>
                  </button>
                  {activeFaq === 3 && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600">
                        Sim, você pode cancelar sua assinatura a qualquer momento. Não há fidelidade ou multa por cancelamento.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-[32px] border-2 border-black overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}
                  >
                    <h3 className="font-semibold text-xl">
                      Para quem é o Content Boutique?
                    </h3>
                    <span className="text-2xl">{activeFaq === 4 ? '−' : '+'}</span>
                  </button>
                  {activeFaq === 4 && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600">
                        Para psicólogos, psicanalistas, terapeutas e outros profissionais de saúde mental, que desejam criar conteúdo de qualidade para suas redes sociais, sem perder horas com isso.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-[32px] border-2 border-black overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === 5 ? null : 5)}
                  >
                    <h3 className="font-semibold text-xl">
                      Preciso ter o canva Pro?
                    </h3>
                    <span className="text-2xl">{activeFaq === 5 ? '−' : '+'}</span>
                  </button>
                  {activeFaq === 5 && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600">
                        Não, nossos conteúdos são feitos com elementos gratuitos, mesmo com o canva free, poderá desfrutar da plataforma tranquilamente.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-[32px] border-2 border-black overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === 6 ? null : 6)}
                  >
                    <h3 className="font-semibold text-xl">
                      Como faço para começar?
                    </h3>
                    <span className="text-2xl">{activeFaq === 6 ? '−' : '+'}</span>
                  </button>
                  {activeFaq === 6 && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600">
                        Basta se inscrever na lista VIP e aguardar o lançamento. Você receberá um desconto especial e será um dos primeiros a ter acesso à plataforma.
                      </p>
                    </div>
                  )}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="form-section" className="bg-[#F1FFF8] py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            Crie Conteúdo de qualidade <br />sem Perder Tempo
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="w-full md:w-1/2 bg-[#F1FFF8] p-10 rounded-[32px] border-2 border-black">
              <h3 className="text-2xl font-semibold mb-8">
                Entre na lista de espera receba <span className="font-bold text-red-600">20% de desconto</span> e comece a criar conteúdos incríveis.
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    className="w-full px-6 py-4 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#FF580D] text-lg"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Seu Email"
                    className="w-full px-6 py-4 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#FF580D] text-lg"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="Seu WhatsApp"
                    className="w-full px-6 py-4 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#FF580D] text-lg"
                    required
                  />
                </div>
                <div>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#FF580D] text-lg appearance-none bg-white"
                    required
                  >
                    <option value="">Selecione sua especialidade</option>
                    <option value="Psicologo">Psicólogo</option>
                    <option value="Psiquiatra">Psiquiatra</option>
                    <option value="Psicanalista">Psicanalista</option>
                    <option value="Terapeuta Holistico">Terapeuta Holístico</option>
                    <option value="Constelador">Constelador</option>
                    <option value="Terapeuta Ocupacional">Terapeuta Ocupacional</option>
                    <option value="Terapeuta TRG">Terapeuta TRG</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
                {formData.specialty === 'outros' && (
                  <div>
                    <input
                      type="text"
                      name="otherSpecialty"
                      value={formData.otherSpecialty}
                      onChange={handleInputChange}
                      placeholder="Digite sua especialidade"
                      className="w-full px-6 py-4 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#FF580D] text-lg"
                      required
                    />
                  </div>
                )}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white px-6 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Inscrever-se'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-600 text-center">Inscrição realizada com sucesso!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-center">Erro ao realizar inscrição. Tente novamente.</p>
                )}
              </form>
            </div>

            <div className="w-full md:w-1/2">
              <div className="w-full">
                <Image src={FormImage} alt="Dashboard" width={1000} height={1000}></Image>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="">
                <Image src={WhiteLogo} alt="Dashboard" width={24}></Image>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-400">
                <span className="sr-only">Facebook</span>
                <div className="h-6 w-6 bg-white rounded-full"></div>
              </a>
              <a href="#" className="hover:text-emerald-400">
                <span className="sr-only">Twitter</span>
                <div className="h-6 w-6 bg-white rounded-full"></div>
              </a>
              <a href="#" className="hover:text-emerald-400">
                <span className="sr-only">Instagram</span>
                <div className="h-6 w-6 bg-white rounded-full"></div>
              </a>
            </div>

            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-emerald-400">By Software Kitnet</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
