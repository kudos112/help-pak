import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import Profile from "~/components/partial-components/profile";
import UserRepository from "~/repositories/UserRepository";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const {query = {}} = useRouter();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [query.uid]);

  const fetchUserDetails = async () => {
    if (query.uid) {
      setLoading(true);
      const response = await UserRepository.getUserById(query.uid);

      if (response.status == 200) setUser(response.data);
    }
  };
  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
