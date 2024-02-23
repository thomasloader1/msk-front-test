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
  const {state: authState} = useContext(AuthContext)

  useEffect(() => {
    const checkTrialCourses = () => {
      const userProfile: any = authState.isAuthenticated && authState.profile ? authState.profile : {} as UserProfile;
      const hasTrialCourses = userProfile?.trial_course_sites;
      
      if (hasTrialCourses && hasTrialCourses.length > 0 && typeof product !== 'undefined') {
        hasTrialCourses.forEach((tc: any) => {
          let contract = JSON.parse(tc.contractJson);
          let isMatch = Number(contract.data[0].Product_Details[0].product.Product_Code) === product?.ficha?.product_code;

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
