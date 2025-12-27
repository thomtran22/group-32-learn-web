import React, { useState, useEffect } from 'react';
import { FaUserCheck, FaUserTimes, FaSearch } from 'react-icons/fa';
import { apiGetAllUsers } from '../../services/adminApi';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [search]);

    const fetchUsers = async () => {
        try {
            const res = await apiGetAllUsers({ search, limit: 20 });
            if (res.success) setUsers(res.users);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý Người dùng</h1>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="relative max-w-md">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm user..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none" 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ tên</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vai trò</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 text-sm font-medium">{user.fullName}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm flex items-center gap-1">
                                    {user.isActive 
                                        ? <span className="text-green-600 flex items-center gap-1"><FaUserCheck /> Active</span>
                                        : <span className="text-red-600 flex items-center gap-1"><FaUserTimes /> Locked</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;