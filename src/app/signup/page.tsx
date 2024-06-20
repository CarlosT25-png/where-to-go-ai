import SignUpForm from "@/components/Auth/SignUpForm";

const page = ({ searchParams }: { searchParams: { message: string }}) => {
  return (
    <SignUpForm searchParams={searchParams} />
  );
}

export default page;