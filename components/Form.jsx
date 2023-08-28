import Link from "next/link"

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";

import Footer from "./Footer";

const Form = ({ type, post, setPost, submitting, handleSubmit,
}) => {

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
      className="w-full max-w-full flex-start flex-col"
    >
      <h1 className="head_text text-left" >
        <span className="green_gradient" >{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md" >
        {type} and share amazing tips, ideas, update from your organization with the World..
      </p>

      {session?.user ? (
        <>
        <form onSubmit={handleSubmit}
          className="mt-10 w-full max-w-2xl flex flex-col gap-7
          glassmorphism">
        <label>
          <span 
          className="font-satoshi font-semibold
          text-base text-gray-700" >Your Feed Post Here</span>

          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value})}
            placeholder="Create your post here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span 
          className="font-satoshi font-semibold
          text-base text-gray-700" >Add your tag {``}
            <span className="font-normal">
              #cooking #sports #idea #tips #product
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value})}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <label>
          <span 
          className="font-satoshi font-semibold
          text-base text-gray-700" >Add redirect link {``}
            <span className="font-normal">
            (website, blog, socialprofile)
            </span>
          </span>

          <input
            value={post.link}
            onChange={(e) => setPost({ ...post, link: e.target.value})}
            placeholder="https://www.youruniquewebsite.com"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/profile" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button 
            type="submit"
            disabled={submitting}
            className="px-6 py-1.5 text-sm bg-primary-green rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>

        </div>

        </form>
          </>
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
                    Hola, You’re required to sign in first to {type} a post.. Sign in <span
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

    </section></>
  )
}

export default Form