import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 bg-[#5956EB] flex justify-center items-center">
        <form className=" relative z-10 flex flex-col mx-auto bg-white w-full max-w-108 px-8 py-8 rounded-xl">
          <div className="flex flex-col justify-center items-center gap-1">
            <Image
              src={"/logo-w-bg.webp"}
              alt="Logo"
              width={40}
              height={40}
              className="w-16 aspect-square mb-2"
            />
            <p className="text-sm text text-foreground">
              Wah kamu balik lagi, yuk gabung bareng Kawula!
            </p>
            <h1 className="text-2xl font-medium my-1">Masuk Akun</h1>
            <div className="flex justify-center items-center gap-2">
              <div className="w-3 aspect-square rounded-full bg-[#5956EB]"></div>
              <p className="text-sm text text-foreground">11.301 Anggota</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
            />
            <SubmitButton
              pendingText="Lagi Proses..."
              formAction={signInAction}
            >
              Gabung Lagi
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
        <Image
          src={"/bg-signup.webp"}
          alt="background"
          width={1440}
          height={1440}
          className="w-full absolute"
        />
      </div>
    </>
  );
}
