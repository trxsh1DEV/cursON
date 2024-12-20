import { Metadata } from 'next';
import CarouselHome, { CarouselGrid } from '@/components/Carousel/Carousel';
import { coursesData } from '@/utils/data/mock-data';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'CursoN - Online Learning Platform',
  description: 'Learn programming efficiently with our online courses.',
};

export const imagesCarousel = ['1.svg', '2.svg', '3.svg'];

export default function Home() {
  const t = useTranslations('Home');

  return (
    <section className="container mx-auto flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-700">{t('subtitle')}</p>
      </div>

      <CarouselHome items={imagesCarousel} />
      <br />
      <h2 className="text-2xl font-bold mb-4">{t('featuredCourses')}</h2>
      <CarouselGrid courses={coursesData} />

      <div className="max-w-3xl text-center mt-10">
        <h1 className="text-2xl text-gray-700 mb-4 font-bold">
          {t('about.title')}
        </h1>
        <p className="text-lg text-gray-700">{t('about.description')}</p>
        <p className="text-lg text-gray-700">{t('about.description2')}</p>
      </div>
    </section>
  );
}
