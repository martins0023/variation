import PromptCard from "./PromptCard";

import Footer from "./Footer";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

import Image from "next/image";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {

  //check user authencity
  const { data: session } = useSession();

  const [providers, setProviders ] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, [])

  return (
    <><section
      className="w-full"
    >
      {session?.user ? (
        <><h1 className="head_text text-left">
          <span className="blue_gradient">{name} profile</span>
        </h1><p className="desc text-left">
            {desc}
          </p>
          <div className="mt-20">
          <Image 
                    src="/assets/images/post highlight.svg" 
                    alt="HelpUnique"
                    width={200}
                    height={300}
                    className="object-contain" /></div>
          <div className="mt-5 prompt_layout">
            {data.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)} />
            ))}
          </div></>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (

              <>
                <div className="flex flex-col items-center justify-between gap-4 mt-5 mb-5">
                <Image 
                    src="/assets/images/404desk.svg" 
                    alt="HelpUnique"
                    width={688}
                    height={484}
                    className="object-contain" />
                  <p className="desc text-left max-w-md" >
                    Hola, You’re required to sign in first to view a profile.. Sign in <span
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="blue_gradient cursor-pointer"
                  >
                    <u>here</u>
                  </span>
                  </p>
                </div>
              </>
            ))}
        </>
      )}

    </section><Footer /></>
  )
}

export default Profile