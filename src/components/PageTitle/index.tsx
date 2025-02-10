interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <div className="flex flex-col items-start gap-4 text-zinc-800 dark:text-zinc-100">
      <h1 className="text-6xl font-bold">{props.title}</h1>
      <p className="text-xl text-zinc-600">{props.subtitle}</p>
    </div>
  );
};

export default PageTitle;
