type Props = {
  title: string;
  value: string | number;
};

export default function SummaryCard({ title, value }: Props) {
  return (
    <div className="rounded-lg border p-4 shadow-sm bg-white">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
