import Image from 'next/image'
import Link from 'next/link'

export default function Header() {

    return (
        <Link href='/'>
            <a>
                <Image className='object-contain'
                    src='https://links.papareact.com/ua6' width={200} height={100}
                />
            </a>
        </Link>
    )
}
