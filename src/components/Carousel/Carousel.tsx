'use client';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { CourseItem } from './types';
import { StarIcon } from 'lucide-react';

export default function CarouselHome({ items }: { items: string[] }) {
  return (
    <Carousel
      className="w-full max-w-3xl"
      opts={{ loop: true, align: 'start' }}
      plugins={[
        Autoplay({
          //   delay: 1000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {items.map((name, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-[16/9] items-center justify-center p-6">
                  <Image
                    className="object-cover object-top"
                    priority
                    src={`/assets/${name}`}
                    alt={`Carousel image ${name}`}
                    width={800}
                    height={400}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function CarouselGrid({ courses }: { courses: CourseItem[] }) {
  return (
    <Carousel
      className="w-full max-w-5xl"
      opts={{
        loop: true,
        align: 'start',
        slidesToScroll: 5,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {courses.map((course, index) => (
          <CarouselItem key={index} className="basis-1/5 pl-2 md:pl-4">
            <div className="p-1">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-32">
                    <Image
                      src={course.image + index}
                      alt={`Image of course ${course.title}`}
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm truncate">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">
                        Updated: {course.last_update}
                      </span>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="text-xs ml-1">
                          {course.avaliation}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="font-semibold">
                        R$ {course.price.toFixed(2)}
                      </span>
                      <span className="text-gray-400 line-through">
                        R$ {(course.price * 4).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
