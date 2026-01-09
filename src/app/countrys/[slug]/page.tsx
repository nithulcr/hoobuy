import { Metadata } from 'next';
import { countriesData } from '../data';
import Header from "../../components/Header";
import Hero2 from "../../components/Hero2";
import Footer from "../../components/Footer";
import CountryTabs from "../../components/CountryTabs";
import CheckmarkIcon from '../../components/CheckmarkIcon';
import Image from "next/image";


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const country = countriesData.find(c => c.slug === params.slug);
  return {
    title: `HooBuy | ${country?.title || '{country.title}'}`,
    description: '',
    keywords: '',
  };
}

export default function CountrySlug({ params }: { params: { slug: string } }) {
  const country = countriesData.find(c => c.slug === params.slug);

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <>
      <Header />
      <Hero2
        heading_en={country.heroHeading}
        breadcrumbPosition="left"
      />
      <section className="py-14 lg:py-20 service-section relative">
        <div className="max-w-[1360px] mx-auto px-6 grid lg:grid-cols-3 z-1 gap-6 relative">
          <div className='flex flex-col gap-6 lg:gap-8 lg:col-span-2'>
            <div className='flex items-center gap-3'>
              <Image src={country.logo} alt="country flag" width={40} height={30} />

              <h1 className='text-[18px] lg:text-[24px] font-semibold mb-1 leading-tight max-w-[600px]'>{country.title}</h1>
            </div>
            <Image
              src={country.image}
              alt="Attestation support, across 120+ countries"
              width={550}
              height={200}
              className="object-cover f-full rounded-[16px] w-full"
            />
            <div className='flex flex-col gap-8'>
              <div className='text-[var(--color)] flex flex-col gap-4 type-1 font-light' dangerouslySetInnerHTML={{ __html: country.content }} />
              <div className='type2'>
                <h4 className='text-xl font-semibold'>{country.process.title}</h4>
                <ul className='mt-4 flex flex-col gap-2'>
                  {country.process.items.map((item, index) => (
                    <li key={index} className='text-sm flex items-center gap-1'>
                      <CheckmarkIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='type3'>
                <h4 className='text-xl font-semibold'>{country.educationalCertificates.title}</h4>
                <ul className='mt-4 flex flex-wrap gap-3'>
                  {country.educationalCertificates.items.map((item, index) => (
                    <li key={index} className='text-sm flex items-center gap-1 bg-white rounded-md pl-2 pr-3 py-1'>
                      <CheckmarkIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='type3'>
                <h4 className='text-xl font-semibold'>{country.purpose.title}</h4>
                <ul className='mt-4 flex flex-wrap gap-3'>
                  {country.purpose.items.map((item, index) => (
                    <li key={index} className='text-sm flex items-center gap-1 bg-white rounded-md pl-2 pr-3 py-1'>
                      <CheckmarkIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className=' mt-4 p-6 lg:p-14 bg-white rounded-3xl flex flex-col justify-center text-center'>
                <h4 className='text-lg lg:text-2xl font-semibold max-w-[600px] mx-auto'>{country.contactTitle}</h4>
                <div className='flex flex-wrap justify-center items-center gap-4 mt-5'>
                  <a href='tel:+971 52 409 1239' className='flex items-center gap-1'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.99181 0.275229C6.13481 1.09566 7.02481 2.21551 7.78481 3.2871L8.22681 3.92139L8.64381 4.52711C8.85239 4.82724 8.94158 5.19247 8.89437 5.55319C8.84716 5.91392 8.66685 6.24493 8.38781 6.48315L6.43681 7.9103C6.34255 7.97733 6.2762 8.07579 6.25009 8.18738C6.22397 8.29896 6.23986 8.41609 6.29481 8.517C6.73681 9.30789 7.52281 10.4859 8.42281 11.3723C9.32281 12.2587 10.5758 13.0841 11.4348 13.5686C11.5425 13.6282 11.6693 13.6448 11.7891 13.6152C11.9088 13.5855 12.0125 13.5117 12.0788 13.4091L13.3488 11.5052C13.5823 11.1998 13.9267 10.9951 14.31 10.9342C14.6932 10.8732 15.0856 10.9607 15.4048 11.1782L16.0678 11.6303C17.3068 12.4773 18.6378 13.4396 19.6558 14.723C19.8173 14.9276 19.92 15.1712 19.9532 15.4283C19.9865 15.6854 19.949 15.9466 19.8448 16.1846C19.0078 18.1081 16.8898 19.746 14.6868 19.6662L14.3868 19.6495L14.1538 19.6298L13.8958 19.6003L13.6148 19.5628L13.3098 19.5136L13.1498 19.484L12.8138 19.4131L12.6378 19.3737L12.2718 19.2811L11.8868 19.1728L11.4848 19.0448C9.63881 18.4282 7.29581 17.2168 4.89181 14.849C2.48781 12.4813 1.25881 10.1746 0.632811 8.35646L0.502811 7.96053L0.392811 7.58133L0.298811 7.22085L0.220811 6.88007C0.198309 6.77334 0.177307 6.6663 0.157811 6.55899L0.107811 6.25859L0.0678111 5.98183L0.0388112 5.72772L0.0188111 5.49824L0.00281118 5.20276C-0.0781888 3.03989 1.60281 0.939062 3.54681 0.118627C3.78079 0.0191182 4.03701 -0.018768 4.29034 0.00868656C4.54367 0.0361411 4.7854 0.127993 4.99181 0.275229ZM13.1268 3.816L13.2428 3.8288C13.9707 3.95526 14.6393 4.30545 15.1527 4.82916C15.6661 5.35288 15.998 6.02324 16.1008 6.74415C16.1375 6.99352 16.0757 7.24723 15.9282 7.4531C15.7807 7.65897 15.5587 7.80135 15.3079 7.85093C15.0571 7.90051 14.7965 7.85353 14.5798 7.71966C14.3631 7.58579 14.2067 7.37521 14.1428 7.13123L14.1198 7.01796C14.0796 6.73539 13.9571 6.47034 13.7672 6.25483C13.5774 6.03933 13.3282 5.88259 13.0498 5.80356L12.8948 5.76909C12.6437 5.72525 12.4191 5.58859 12.2669 5.38704C12.1147 5.1855 12.0465 4.93431 12.0761 4.68484C12.1057 4.43537 12.231 4.20648 12.4263 4.04498C12.6216 3.88347 12.8722 3.80156 13.1268 3.816ZM13.1348 0.821857C14.7261 0.821857 16.2522 1.44446 17.3775 2.55271C18.5027 3.66095 19.1348 5.16406 19.1348 6.73135C19.1345 6.98239 19.0369 7.22384 18.862 7.40638C18.687 7.58892 18.4479 7.69877 18.1934 7.71348C17.939 7.72819 17.6884 7.64666 17.493 7.48554C17.2975 7.32441 17.1719 7.09586 17.1418 6.84659L17.1348 6.73135C17.1347 5.73123 16.7484 4.76858 16.0543 4.03862C15.3601 3.30867 14.4101 2.86606 13.3968 2.80055L13.1348 2.79169C12.8696 2.79169 12.6152 2.68792 12.4277 2.50321C12.2402 2.31851 12.1348 2.06799 12.1348 1.80677C12.1348 1.54556 12.2402 1.29504 12.4277 1.11033C12.6152 0.925625 12.8696 0.821857 13.1348 0.821857Z" fill="#09424D" />
                    </svg>
                    <p> +971 52 409 1239</p>
                  </a>
                  <span className='bg-[var(--siteColor)] w-[1px] h-4 hidden md:block'></span>
                  <a href='mailto:info@attestationuae.com' className='flex items-center gap-1'>
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.25 0H4.75C3.49022 0 2.28204 0.500445 1.39124 1.39124C0.500445 2.28204 0 3.49022 0 4.75V13.75C0 14.3738 0.122862 14.9915 0.361572 15.5677C0.600282 16.144 0.950164 16.6677 1.39124 17.1088C2.28204 17.9996 3.49022 18.5 4.75 18.5H15.25C16.509 18.4974 17.7156 17.9961 18.6058 17.1058C19.4961 16.2156 19.9974 15.009 20 13.75V4.75C19.9974 3.49103 19.4961 2.28439 18.6058 1.39416C17.7156 0.503936 16.509 0.00264212 15.25 0ZM11.6 8.32C11.108 8.60059 10.5514 8.74815 9.985 8.74815C9.41861 8.74815 8.862 8.60059 8.37 8.32L1.52 4.39C1.60857 3.5953 1.98701 2.86115 2.58292 2.32797C3.17883 1.79478 3.95038 1.5 4.75 1.5H15.25C16.049 1.50219 16.8194 1.79773 17.4148 2.3305C18.0103 2.86327 18.3893 3.59616 18.48 4.39L11.6 8.32Z" fill="#09424D" />
                    </svg>

                    <p> info@attestationuae.com</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:col-span-1'>
            <div className='max-w-[500px] mx-auto'>
              <CountryTabs />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}