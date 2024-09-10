import AdminLayout from '@/components/AdminLayout'
import { useRouter } from 'next/router'
import { FC } from 'react' // Import FC (Functional Component) type from React

// Define props interface (if any)
interface PageProps {
  // Define props if there are any
}

// Functional component definition with TypeScript
const TipsForm: FC<PageProps> = () => {
  const router = useRouter()
  // Assuming router.query.slug is of type string | string[] | undefined
  return <AdminLayout>Post: {router.query.slug}</AdminLayout>
}

export default TipsForm
