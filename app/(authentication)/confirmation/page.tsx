import Link from 'next/link';

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
                <p className="text-gray-700 mb-8">
                Thank you for registering. Your account has been successfully created.
                </p>
                <Link href="/log-in">
                    <span className="text-secondary hover:underline">Click here to login</span>
                </Link>
            </main>
        </div>
    );
};

export default Page;
