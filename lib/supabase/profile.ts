import { createClient } from './client';
import { UserProfileWithShipping } from '@/lib/types/auth';

/**
 * 주소 문자열을 파싱하여 우편번호, 주소, 상세주소로 분리
 * 형식: "[우편번호] 주소, 상세주소"
 */
function parseAddress(fullAddress: string | null) {
  if (!fullAddress) {
    return {
      postcode: null,
      address: null,
      detail_address: null,
    };
  }

  // "[12345] 서울특별시 강남구, 101동 1001호" 형식 파싱
  const postcodeMatch = fullAddress.match(/\[(\d+)\]/);
  const postcode = postcodeMatch ? postcodeMatch[1] : null;

  // 우편번호 제거
  const withoutPostcode = fullAddress.replace(/\[\d+\]\s*/, '');

  // 첫 번째 쉼표로만 주소와 상세주소 분리
  const firstCommaIndex = withoutPostcode.indexOf(',');
  let address = null;
  let detail_address = null;

  if (firstCommaIndex !== -1) {
    address = withoutPostcode.substring(0, firstCommaIndex).trim() || null;
    detail_address = withoutPostcode.substring(firstCommaIndex + 1).trim() || null;
  } else {
    address = withoutPostcode.trim() || null;
  }

  return {
    postcode,
    address,
    detail_address,
  };
}

/**
 * 사용자 프로필 정보 가져오기 (주소, 전화번호 포함)
 */
export async function getUserProfileWithShipping(
  userId: string
): Promise<UserProfileWithShipping | null> {
  const supabase = createClient();

  try {
    // profiles 테이블에서 사용자 정보 가져오기
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // 주소 파싱
    const { postcode, address, detail_address } = parseAddress(data.address);

    // auth.users에서 이메일과 아바타 가져오기
    const { data: { user } } = await supabase.auth.getUser();

    return {
      id: data.id,
      email: user?.email || '',
      name: data.name || '',
      avatar_url: user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null,
      phone: data.phone || null,
      postcode: postcode,
      address: address,
      detail_address: detail_address,
    };
  } catch (error) {
    console.error('Exception fetching user profile:', error);
    return null;
  }
}

/**
 * 사용자 프로필 정보 업데이트
 */
export async function updateUserProfile(
  userId: string,
  profile: Partial<Omit<UserProfileWithShipping, 'id' | 'email' | 'avatar_url'>>
): Promise<boolean> {
  const supabase = createClient();

  try {
    // 주소 정보가 있으면 하나의 문자열로 합치기
    let fullAddress: string | undefined;
    if (profile.postcode || profile.address || profile.detail_address) {
      const postcodePart = profile.postcode ? `[${profile.postcode}] ` : '';
      const addressPart = profile.address || '';
      const detailPart = profile.detail_address ? `, ${profile.detail_address}` : '';
      fullAddress = postcodePart + addressPart + detailPart;
    }

    // profiles 테이블에 저장할 데이터 구성
    const updateData: {
      name?: string;
      phone?: string | null;
      address?: string;
    } = {};

    if (profile.name !== undefined) updateData.name = profile.name;
    if (profile.phone !== undefined) updateData.phone = profile.phone;
    if (fullAddress !== undefined) updateData.address = fullAddress;

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (error) {
      console.error('Error updating user profile:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Exception updating user profile:', error);
    return false;
  }
}
