import api from 'Services/api';
import { AuthContext } from 'context/user/AuthContext';
import { FetchSingleProduct, UserProfile } from 'data/types';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

interface TrialCoursesStatus {
  hasCoursedRequested: boolean;
  showAlreadyRequest: boolean;
  setShowAlreadyRequest: Dispatch<SetStateAction<boolean>>
}

const useRequestedTrialCourse = (product?: any): TrialCoursesStatus => {
  const [hasCoursedRequested, setHasCoursedRequested] = useState(false);
  const [showAlreadyRequest, setShowAlreadyRequest] = useState(false);

  useEffect(() => {
    const checkTrialCourses = async () => {
      const userProfile: any = await api.getUserData();
      const hasTrialCourses = userProfile?.contact.trial_course_sites;
      
      console.log({userProfile, hasTrialCourses})
      
      if (hasTrialCourses && hasTrialCourses.length > 0 && typeof product !== 'undefined') {
        hasTrialCourses.forEach((tc: any) => {
          let contract = JSON.parse(tc.contractJson);
          let productWpCode = product?.ficha?.product_code ?? product.product_code; 
          let isMatch = Number(contract.data[0].Product_Details[0].product.Product_Code) === productWpCode;
          console.log({contract, isMatch,productWpCode,product})
          
          if (isMatch) {
            setHasCoursedRequested(isMatch);
            setShowAlreadyRequest(isMatch);
            return;
          } else {
            setHasCoursedRequested(isMatch);
          }
        });
      } else if (Object.keys(userProfile).length > 1) {
        setHasCoursedRequested(false);
      }
    };

    checkTrialCourses();
  }, [product]);

  return { hasCoursedRequested, showAlreadyRequest, setShowAlreadyRequest };
};

export default useRequestedTrialCourse;
