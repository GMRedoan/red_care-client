import { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Authentication/AuthContex';
import DonorCard from '../Shared/DonorCard';

const Search = () => {
    const { donors } = use(AuthContext)
    const { user } = use(AuthContext)
    const { districts, upazilas } = useLoaderData()
    const { register, handleSubmit } = useForm()

    const [filteredDonors, setFilteredDonors] = useState([])

    const handleSearch = (data) => {
        const { bloodGroup, district, upazila } = data

        const results = donors.filter(donor =>
            (user?.email ? donor.email !== user.email : true) &&
            (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
            (district ? donor.district === district : true) &&
            (upazila ? donor.upazila === upazila : true)
        )

        setFilteredDonors(results)
    }

    return (
        <section className="bg-base-200 py-10 px-6 md:px-16">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-16">
                    Search for <span className='text-primary'>Blood</span> Donors
                </h2>

                <form onSubmit={handleSubmit(handleSearch)} className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Blood Group</span>
                        </label>
                        <select {...register('bloodGroup')} required className="select select-bordered w-full" defaultValue="">
                            <option value="" disabled>Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    {/* DISTRICT */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">District</span>
                        </label>
                        <select {...register('district')} required className="select select-bordered w-full" defaultValue="">
                            <option value="" disabled>Select District</option>
                            {
                                districts.map(d => <option key={d.id}>{d.name}</option>)
                            }
                        </select>
                    </div>

                    {/* UPAZILA */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Upazila</span>
                        </label>
                        <select {...register('upazila')} className="select select-bordered w-full" defaultValue="">
                            <option value="" disabled>Select Upazila</option>
                            {
                                upazilas.map(u => <option key={u.id}>{u.name}</option>)
                            }
                        </select>
                    </div>

                    <div className="md:col-span-3 flex justify-center mt-4">
                        <button className="btn btn-primary w-full md:w-auto px-10 text-white font-semibold">
                            Search
                        </button>
                    </div>
                </form>

                <div className="mt-10">
                    <div className="overflow-x-auto w-full rounded-xl shadow-lg">
                        <div className="bg-base-200">

                            {filteredDonors.length > 0 ? (
                                <table className="table w-full bg-white">
                                    <thead>
                                        <tr className="bg-gray-200 text-accent">
                                            <th className='md:pl-25'>Name</th>
                                            <th className="px-4 text-left">Blood Group</th>
                                            <th className="px-4 text-left">Email</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredDonors.map(donor => (
                                            <DonorCard
                                                key={donor.email}
                                                donor={donor}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-10 text-gray-500 font-medium text-lg">
                                    Currently No Donor Available
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Search;
