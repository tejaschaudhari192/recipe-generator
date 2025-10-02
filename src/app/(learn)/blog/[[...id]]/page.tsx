interface PageProps {
  params: {
    id: string;
  };
}

export default function IdPage({ params }: PageProps) {
  const id = params.id;
  console.log(id);

  return <div>BlogId = {JSON.stringify(id)}</div>;
}
