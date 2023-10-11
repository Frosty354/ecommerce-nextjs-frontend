import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import { selectIsAuthenticated } from '@/redux/userSlice';
import { useSelector } from 'react-redux';

type Product = {
  _id: string;
  productname: string;
  image: string;
  productId: number;
  description: string;
  price: number;
  category: string;
  createdBy: string;
  createdAt: Date;
  __v: number;
};

type ProductPageProps = {
  product: Product; // Use a single product prop
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    //@ts-ignore
    const { productId } = context.params;
    const authToken = context.req.cookies.accessToken; // Get the auth token from the request

    const response = await axios.get(`${process.env.NEXT_PUBLIC_FLUID_API}/products/getProduct/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken}`,
      },
    });

    const product = response.data;

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("hh,",error);

    return {
      props: {
        product: {},
      },
    };
  }
};

const ProductPage = ({ product }: ProductPageProps) => {
  const router = useRouter();
  const isAuthenticated= useSelector(selectIsAuthenticated);

  
  const handleBuyNow = async () => {
    console.log("handle buy", product);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <Image src={product.image} alt={product.productname} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-2">{product.productname}</h1>
          <h1 className="text-2xl mb-2">{product.description}</h1>
          <h1 className="text-2xl font-semibold mb-2">{product.category}</h1>
          <p className="text-gray-600 text-lg mb-4">Price: ${product.price}</p>
          <button
            onClick={handleBuyNow}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;


