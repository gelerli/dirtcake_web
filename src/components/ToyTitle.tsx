/** Title + optional subtitle on a second line (no empty line when subtitle is blank). */
export default function ToyTitle({
  toy,
}: {
  toy: { title: string; subtitle: string };
}) {
  return (
    <>
      {toy.title}
      {toy.subtitle.trim() && (
        <>
          <br />
          {toy.subtitle}
        </>
      )}
    </>
  );
}
