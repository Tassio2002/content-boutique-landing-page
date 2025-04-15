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
import TamaraImage from "../../public/images/tamara.png"
import ValterImage from "../../public/images/valter.png"
import NetoImage from "../../public/images/neto.png"
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Componente de animação reutilizável
const ScrollReveal = ({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

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
          <div className="flex items-center gap-2">
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
      <section className="container mx-auto px-4 pt-8 pb-16 md:py-16 max-w-[1200px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <ScrollReveal className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
            <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto md:mx-0">
              Fazendo malabarismo entre pacientes, supervisão, TCCs e ainda tentando postar no Insta? Calma, a gente resolve isso.
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Afinal, você é psicólogo ou designer?
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="flex-1 w-full md:w-auto">
            <div className="w-full h-[250px] sm:h-[300px] md:h-[492px] max-w-[560px] mx-auto relative">
              <Image
                src={HeroImage}
                alt="Dashboard"
                width={560}
                height={560}
                className="object-contain animate-float"
                priority
                style={{ maxHeight: '100%' }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="bg-[#e8f8f4] py-8 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="space-y-8">
            {/* Text and Illustration */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
              <ScrollReveal className="w-full md:w-1/3">
                <div className="w-full aspect-square max-w-[300px] mx-auto">
                  <Image
                    src={ProductIllustration}
                    alt="Dashboard"
                    width={1000}
                    height={1000}
                    className="object-contain"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2} className="w-full md:w-2/3">
                <p className="text-base text-center md:text-left md:text-lg text-gray-800 leading-relaxed">
                  Com poucos cliques, <span className="font-semibold">você gera conteúdo bonito, estratégico e com a sua cara</span>. E ainda sobra tempo pro cafezinho.
                  <br />Como funciona: <br />Você fala o que precisa. <span className="font-semibold">A gente faz a mágica com IA e Canva</span>.
                  <br />Quer carrossel? Post? Legenda que não pareça de robô? Pronto. Em minutos, você tem tudo isso com uma estética pensada pra <span className="font-semibold">psicólogos autênticos</span> — nada de design genérico estilo PowerPoint 2007.
                  <br />Entra logo na lista VIP e <span className="font-semibold">garanta sua vaga por R$39,90 por mês no lançamento</span>. Após o lançamento, o preço será de R$49,90 por mês.
                </p>
              </ScrollReveal>
            </div>

            {/* Dashboard Preview */}
            <ScrollReveal delay={0.4} className="w-full mt-8">
              <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden">
                <Image
                  width={1168}
                  height={657}
                  src="/images/content-boutique.png"
                  alt="Preview do Dashboard Content Boutique"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-16 lg:py-24 md:mb-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-20">
              O que você ganha com o Content Boutique:
            </h2>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <ScrollReveal className="w-full md:w-1/2 h-[300px] md:h-[646px] rounded-xl overflow-hidden">
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                className="h-full"
              >
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/1 f.png"
                      alt="Feature 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/1 g.png"
                      alt="Feature 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/1 p (2).png"
                      alt="Feature 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/2 f.png"
                      alt="Feature 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/2 g.png"
                      alt="Feature 4"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/2 p.png"
                      alt="Feature 5"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/3 f.png"
                      alt="Feature 6"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/3 g.png"
                      alt="Feature 7"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/3 p.png"
                      alt="Feature 8"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/4 f.png"
                      alt="Feature 9"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/4 g.png"
                      alt="Feature 10"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/4 p.png"
                      alt="Feature 11"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/5 f.png"
                      alt="Feature 12"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/5 g.png"
                      alt="Feature 13"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/5 p.png"
                      alt="Feature 14"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/6 g.png"
                      alt="Feature 15"
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="w-full md:w-1/2 h-auto md:h-[646px] flex flex-col justify-between">
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 pb-4 md:pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-lg md:text-xl w-full md:w-1/3">Post Estratégico Sem Sofrimento</h3>
                  <p className="text-gray-600 flex-1">Não precisa saber copy, marketing ou design. A IA faz o trabalho pesado por você.</p>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 pb-4 md:pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-lg md:text-xl w-full md:w-1/3">Design que Fala por Você</h3>
                  <p className="text-gray-600 flex-1">Nossos pacotes do Canva são exclusivamente bonitos e transmitem sua vibe como psicólogo (acolhedor? direto ao ponto? calmo? geek? temos!).</p>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 pb-4 md:pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-lg md:text-xl w-full md:w-1/3">Tempo Livre Liberado!</h3>
                  <p className="text-gray-600 flex-1">Menos tempo criando post = mais tempo pra fazer nada ou fazer o que quiser.</p>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 pb-4 md:pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-lg md:text-xl w-full md:w-1/3">Conexão Real com Pacientes</h3>
                  <p className="text-gray-600 flex-1">Posts que não parecem genéricos = mais engajamento e mais consultas marcadas.</p>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 pb-4 md:pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-lg md:text-xl w-full md:w-1/3">Parar não é uma opção</h3>
                  <p className="text-gray-600 flex-1">
                    Tanto os templates como os agentes de IA, são constantemente atualizados para garantir que você tenha o melhor conteúdo.
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <div className="text-center md:text-right w-full md:w-2/3">
                  <p className="text-gray-800 text-base md:text-lg mb-6">
                    Nossa plataforma oferece uma forma simples e eficaz de criar conteúdo impactante e crescer no Instagram, sem complicações.
                  </p>
                  <button
                    onClick={handleScrollToForm}
                    className="w-full md:w-auto bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gray-800 transition-colors text-base md:text-lg"
                  >
                    Inscreva-se
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* A Day in the Life Section */}
      <section className="py-16 md:pb-4 md:pt-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* Title centered at the top */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-4 mb-12 md:mb-20">
              <Image
                src="/images/flow1.png"
                alt="Flow icon"
                width={80}
                height={80}
                className="object-contain"
              />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold md:text-center">
                Seu Dia com a<br />
                Content Boutique
              </h2>
            </div>
          </ScrollReveal>

          {/* Timeline content */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Timeline items */}
              <ScrollReveal className="flex-1 w-full">
                <div className="flex flex-col gap-6 md:gap-10">
                  {/* 9 AM */}
                  <div className="flex gap-4 md:gap-6 items-center border-b-4 border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-full w-[2px] bg-gray-200 my-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full -translate-x-[5px]"></div>
                      </div>
                      <div className="text-gray-400 text-xl md:text-2xl font-light w-16 text-right">9:00</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-base md:text-lg text-center md:text-left">
                        Você clica em &ldquo;gerar conteúdo&ldquo;
                      </p>
                    </div>
                  </div>

                  {/* 9:01 AM */}
                  <div className="flex gap-4 md:gap-6 items-center border-b-4 border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-full w-[2px] bg-gray-200 my-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full -translate-x-[5px]"></div>
                      </div>
                      <div className="text-gray-400 text-xl md:text-2xl font-light w-16 text-right">9:01</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-base md:text-lg text-center md:text-left">
                        O conteúdo tá pronto.
                      </p>
                    </div>
                  </div>

                  {/* 9:02 AM */}
                  <div className="flex gap-4 md:gap-6 items-center border-b-4 border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-full w-[2px] bg-gray-200 my-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full -translate-x-[5px]"></div>
                      </div>
                      <div className="text-gray-400 text-xl md:text-2xl font-light w-16 text-right">9:02</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-base md:text-lg text-center md:text-left">
                        Você escolhe um de nossos templates e edita.
                      </p>
                    </div>
                  </div>

                  {/* 9:10 AM */}
                  <div className="flex gap-4 md:gap-6 items-center border-b-4 border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-full w-[2px] bg-gray-200 my-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full -translate-x-[5px]"></div>
                      </div>
                      <div className="text-gray-400 text-xl md:text-2xl font-light w-16 text-right">9:10</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-base md:text-lg text-center md:text-left">
                        Você posta e ainda sobra tempo pra um cafezinho.
                      </p>
                    </div>
                  </div>

                  {/* 17 PM */}
                  <div className="flex gap-4 md:gap-6 items-center">
                    <div className="flex items-center gap-4">
                      <div className="h-full w-[2px] bg-gray-200 my-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full -translate-x-[5px]"></div>
                      </div>
                      <div className="text-gray-400 text-xl md:text-2xl font-light w-16 text-right">17:00</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-base md:text-lg text-center md:text-left">
                        Tá relaxado no sofá só olhando os comentários bombando.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Image */}
              <ScrollReveal delay={0.2} className="w-full md:w-1/2 h-[300px] md:h-[500px] mt-8 md:mt-0">
                <Image
                  src={UserFlowImage}
                  alt="Dashboard"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal delay={0.4} className="flex justify-center mt-12 md:mt-16">
            <button
              onClick={handleScrollToForm}
              className="bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gray-800 transition-colors text-base md:text-lg w-full md:w-auto"
            >
              Se inscreva agora
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 md:pb-24 md:pt-32">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col gap-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-16">
              <ScrollReveal className="md:w-1/2">
                <h2 className="text-5xl md:text-6xl font-bold">
                  Por que usar o<br />Content Boutique?
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="md:w-1/2">
                <p className="text-gray-800 text-lg leading-relaxed">
                  Porque seu tempo vale mais do que quebrar a cabeça no Canva todo dia.
                  Seu conteúdo precisa trabalhar por você. Com nossa IA e nossos templates únicos, <span className="font-semibold">você vira referência sem parecer uma marca genérica</span>.
                </p>
              </ScrollReveal>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal>
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
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
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
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
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
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col md:flex-row gap-16">
            <ScrollReveal className="md:w-1/2">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                O que os psicólogos estão falando sobre o nosso trabalho
              </h2>
              <p className="text-gray-800 text-lg">
                Veja como nosso trabalho está transformando a forma como psicólogos criam conteúdo para suas redes sociais.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="md:w-1/2 grid grid-cols-1 gap-6">
              <div className="bg-[#F1FFF8] p-8 rounded-[32px] border-2 border-black">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full">
                    <Image src={TamaraImage} alt="Dra. Tamara Tássia" width={99} className="rounded-full"></Image>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Dra. Tamara Tássia</h3>
                    <p className="text-gray-600">Médica & Esteta</p>
                  </div>
                </div>
                <p className="mt-4 text-lg">
                  &ldquo;A arte gráfica feita por vocês  reflete completamente o meu inteiror, como que fizeram uma cópia dos meus desejos e pensamentos editada para o público. Me sinto lisonjeada em fazer parte do trabalho de vocês. Todo empenho e força que está sendo gasto ao meu favor já está fazendo uma enorme diferença nas minhas redes sociais. Sei que está sendo só o começo. Gratidão 🙏❤️&rdquo;
                </p>
              </div>

              <div className="bg-[#F1FFF8] p-8 rounded-[32px] border-2 border-black">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full">
                    <Image src={ValterImage} alt="Dr. Valter Henrique da Silva Jr" width={99} className="rounded-full"></Image>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Dr. Valter Henrique da Silva Jr</h3>
                    <p className="text-gray-600">Psicólogo TCC, Sexólogo e Neuropsicólogo</p>
                  </div>
                </div>
                <p className="mt-4 text-lg">
                  &ldquo;Olha tenho amado seu trabalho, é o conjunto né, você acertou MUITO no design, entendeu super bem o que eu queria e também tirou sempre minhas dúvidas, sempre atenciosa, deu excelentes ideias de conteúdo e é incrível isso pq casou direitinho com minhas expectativas.&rdquo;
                </p>
              </div>

              <div className="bg-[#F1FFF8] p-8 rounded-[32px] border-2 border-black">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full">
                    <Image src={NetoImage} alt="Dr. Silvio Neto" width={99} className="rounded-full"></Image>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Dr. Silvio Neto</h3>
                    <p className="text-gray-600">Psicólogo TCC e DBT</p>
                  </div>
                </div>
                <p className="mt-4 text-lg">
                  &ldquo;Tô curtindo demais o processo kkk. As dicas de conteúdo têm me ajudado muito a organizar as ideias, criar postagens com mais intenção. Senti que o perfil tá ganhando mais identidade e o engajamento melhorou também!&rdquo;
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F1FFF8]">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col md:flex-row gap-16">
            <ScrollReveal className="md:w-1/2">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Perguntas Frequentes
              </h2>
              <p className="text-gray-800 text-lg">
                Tire suas dúvidas sobre como o Content Boutique pode ajudar você a criar conteúdo de qualidade para suas redes sociais. Caso tenha mais dúvidas, entre em contato conosco, pelo Whatsapp <a href="https://wa.link/0jwtfr" target="_blank" rel="noopener noreferrer" className="text-[#0159FF] hover:text-[#015affcb] transition-colors">Clicando aqui</a>.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="md:w-1/2">
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
                <div className="bg-white rounded-[32px] border-2 border-black overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === 7 ? null : 7)}
                  >
                    <h3 className="font-semibold text-xl">
                      O que é a lista VIP?
                    </h3>
                    <span className="text-2xl">{activeFaq === 7 ? '−' : '+'}</span>
                  </button>
                  {activeFaq === 7 && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600">
                        É a lista de espera para o lançamento do Content Boutique. Você receberá um desconto especial e pagará apenas R$ 39,90/mês e será um dos primeiros a ter acesso à plataforma. Quem entrar após o lançamento, pagará R$ 49,90/mês.
                      </p>
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-[32px] border-2 border-black overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === 8 ? null : 8)}
                  >
                    <h3 className="font-semibold text-xl">
                      E se eu não souber usar o canva ou a plataforma?
                    </h3>
                    <span className="text-2xl">{activeFaq === 8 ? '−' : '+'}</span>
                  </button>
                  {activeFaq === 8 && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600">
                        Não tem problema! Vamos ter videos tutoriais para te ajudar a usar a plataforma e o canva. Além disso temos um canal de atendimento para te ajudar com qualquer dúvida.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="form-section" className="bg-[#F1FFF8] py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
              Crie Conteúdo de qualidade <br />sem Perder Tempo
            </h2>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <ScrollReveal className="w-full md:w-1/2 bg-[#F1FFF8] p-5 md:p-10 rounded-[32px] border-2 border-black">
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
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="w-full md:w-1/2">
              <div className="w-full">
                <Image src={FormImage} alt="Dashboard" width={1000} height={1000}></Image>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <ScrollReveal>
              <div className="flex items-center gap-2">
                <Image src={WhiteLogo} alt="Dashboard" width={24}></Image>
                <span className="text-sm">Content Boutique</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex gap-6">
                <a
                  href="https://www.instagram.com/vel.aesfeed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://wa.link/0jwtfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 308 308"
                    fill="currentColor"
                    stroke="currentColor"
                  >
                    <path d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"></path>
                    <path d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"></path>
                  </svg>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <a href="#" className="text-sm hover:text-emerald-400 transition-colors">By Software Kitnet</a>
            </ScrollReveal>
          </div>
        </div>
      </footer>
    </main>
  );
}
