interface PageProps {
  params: {
    arr: string[];
  };
}

export default function ItemsPage({ params }: PageProps) {
  const array = params.arr;
  console.log(array);

  return (
    <div>
      Items = {JSON.stringify(array)}
    </div>
  );
}
