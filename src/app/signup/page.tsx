import SignUpForm from "@/components/Auth/SignUpForm";
import GoogleCaptchaWrapper from "../GoogleCaptchaProvider";

const page = ({ searchParams }: { searchParams: { message: string }}) => {
  return (
    <GoogleCaptchaWrapper>
      <SignUpForm searchParams={searchParams} />
    </GoogleCaptchaWrapper>
  );
}

export default page;