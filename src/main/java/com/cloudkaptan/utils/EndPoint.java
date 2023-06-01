package com.cloudkaptan.utils;

public class EndPoint {
    /**
	 * **************************TestRail******************************
	 */

	/**
	 * Endpoints related to Cases
	 */
	public static String GET_CASE = "/index.php?/api/v2/get_case/{case_id}";
	public static String GET_CASES = "/index.php?/api/v2/get_cases/{project_id}&suite_id={suite_id}";

	/**
	 * Endpoints for adding and modifying attachments
	 */
	public static String ADD_ATTACHMENT_TO_CASE = "/index.php?/api/v2/add_attachment_to_case/{case_id}";
	public static String ADD_ATTACHMENT_TO_PLAN = "/index.php?/api/v2/add_attachment_to_plan/{plan_id}";
	public static String ADD_ATTACHMENT_TO_RESULT = "/index.php?/api/v2/add_attachment_to_result/{result_id}";
	public static String ADD_ATTACHMENT_TO_RUN = "/index.php?/api/v2/add_attachment_to_run/{run_id}";
	public static String ADD_ATTACHMENT_TO_TEST = "/index.php?/api/v2/add_attachment_to_test/{test_id}";

	/**
	 * Endpoints for getting configs
	 */
	public static String GET_CONFIGS = "index.php?/api/v2/get_configs/{project_id}";

	/**
	 * Endpoints for Groups
	 */
	public static String GET_GROUP = "/index.php?/api/v2/get_group/{group_id}";
	public static String GET_GROUPS = "/index.php?/api/v2/get_groups";
	public static String UPDATE_GROUP = "/index.php?/api/v2/update_group/{group_id}";

	/**
	 * Endpoints for Milestone
	 */
	public static String GET_MILESTONE = "/index.php?/api/v2/get_milestone/{milestone_id}";
	public static String GET_MILESTONES = "/index.php?/api/v2/get_milestones/{project_id}";
	public static String UPDATE_MILESTONE = "/index.php?/api/v2/update_milestone/{milestone_id}";

	/**
	 * Endpoints for Plans
	 */
	public static String ADD_PLAN = "/index.php?/api/v2/add_plan/{project_id}";
	public static String ADD_PLAN_ENTRY = "/index.php?/api/v2/add_plan_entry/{plan_id}";
	public static String GET_PLAN = "/index.php?/api/v2/get_plan/{plan_id}";
	public static String GET_PLANS = "/index.php?/api/v2/get_plans/{project_id}";
	public static String UPDATE_PLAN = "/index.php?/api/v2/update_plan/{plan_id}";
	public static String UPDATE_PLAN_ENTRY = "/index.php?/api/v2/update_plan_entry/{plan_id}/{entry_id}";

	/**
	 * Endpoints for Projects
	 */
	public static String GET_PROJECT = "/index.php?/api/v2/get_project/{project_id}";
	public static String GET_PROJECTS = "/index.php?/api/v2/get_projects";
	public static String UPDATE_PROJECT = "/index.php?/api/v2/update_project/{project_id}";

	/**
	 * Endpoints for Reports
	 */
	public static String GET_REPORT = "/index.php?/api/v2/get_report/{report_type}/{project_id}";

	/**
	 * Endpoints for Results
	 */
	public static String ADD_RESULT = "/index.php?/api/v2/add_result/{test_id}";
	public static String ADD_RESULTS = "/index.php?/api/v2/add_results/{run_id}";
	public static String ADD_RESULTS_FOR_CASES = "/index.php?/api/v2/add_results_for_cases/{run_id}";
	public static String ADD_RESULTS_FOR_CASES_WITH_HISTORY = "/index.php?/api/v2/add_results_for_cases/{run_id}&history=1";
	public static String GET_RESULTS = "/index.php?/api/v2/get_results/{test_id}";
	public static String GET_RESULTS_FOR_CASE = "/index.php?/api/v2/get_results_for_case/{run_id}/{case_id}";
	public static String GET_RESULTS_FOR_RUN = "/index.php?/api/v2/get_results_for_run/{run_id}";
	public static String GET_RESULTS_FOR_RUNS = "/index.php?/api/v2/get_results_for_run/{project_id}";
	public static String UPDATE_RESULT = "/index.php?/api/v2/update_result/{result_id}";
	public static String UPDATE_RESULTS = "/index.php?/api/v2/update_results/{run_id}";

	/**
	 * Endpoints for Result Fields
	 */
	public static String GET_RESULT_FEILDS = "index.php?/api/v2/get_result_fields";

	/**
	 * Endpoints for Status
	 */
	public static String GET_CASE_STATUSES = "index.php?/api/v2/get_case_statuses";
	public static String GET_STATUSES = "/index.php?/api/v2/get_statuses";

	/**
	 * Endpoints for Tests
	 */
	public static String GET_TEST = "/index.php?/api/v2/get_test/{test_id}";
	public static String GET_TESTS = "/index.php?/api/v2/get_tests/{run_id}";
	public static String UPDATE_TEST = "/index.php?/api/v2/update_test/{test_id}";
}
