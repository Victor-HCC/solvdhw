import { EmployeeInput, Employee, UpdateFields } from "../types/types";

abstract class EmployeeRepository {
  abstract create(employee: EmployeeInput): Promise<Employee>
  abstract findById(id: number): Promise<Employee | null>
  abstract update(id: number, fields: UpdateFields): Promise<Employee | null>
  abstract delete(id: number): Promise<boolean>
  abstract getAll(): Promise<{ employees: Employee[]; totalCount: number }>
  abstract findByUserId(userId: number): Promise<Employee | null>
}

export default EmployeeRepository