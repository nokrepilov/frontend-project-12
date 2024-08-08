import {Link} from'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className='text-center' >
      <h1 className='h4 text-muted'> {t('notFoundPage.header')} </h1>
      <p className='text-muted'> 
        {t('notFoundPage.text')} 
        <Link to="/"> {t('notFoundPage.linkMainPage')} </Link>
      </p>
    </div>
  )
}

export default NotFound; 