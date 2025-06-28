import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/types/blog";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, author, external_link, tags, publishDate } =
    blog;
  return (
    <>
      <div className="group relative overflow-hidden rounded-xl bg-background shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
        <Link
          href={external_link}
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
            {tags[0]}
          </span>
          <Image src={image} alt="image" fill className="object-cover" />
        </Link>
        <div className="flex h-[340px] flex-col p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href={external_link}
              className="mb-4 line-clamp-2 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-xl"
            >
              {title}
            </Link>
          </h3>
          <p className="line-clamp-3  flex-grow  border-opacity-10 text-base font-medium  text-body-color">
            {paragraph}
          </p>
          <div className="mt-6 flex items-center border-t border-body-color pt-6 dark:border-neutral-500 dark:border-opacity-10">
            <Link
              href={`/team/${author.id}`}
              className="group/author mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-neutral-500 dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5"
            >
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={author.image} alt="author" fill />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  By{" "}
                  <span className="group-hover/author:text-primary">
                    {author.name}
                  </span>
                </h4>
                <p className="text-xs text-body-color">{author.designation}</p>
              </div>
            </Link>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">{publishDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
