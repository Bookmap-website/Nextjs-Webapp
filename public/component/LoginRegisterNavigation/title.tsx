"use client";

type Props = {
  text: string;
};

export default function FormTitle({ text }: Props) {
  return (
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
      {text}
    </h1>
  );
}