<?php

class Controller {
	function generateRequestScheduleTable($schedule_date) {
		echo "<div class='w3-container '><h2>SCHEDULE DATE: " . $schedule_date . "</h2></div>";
		echo "<header class='w3-container w3-margin-bottom w3-center w3-white' id='home'>";

		$database = new Database();
		$database->connectDB();
		$schedules =  $database->getSchedules($schedule_date);
		$schedules_hdg = $schedules[0];
		$students =  $database->getStudents(1);
		$instructors =  $database->getInstructors();
		$purposes =  $database->getPurpose();
		//print_r($schedules);
		echo "<div class='w3-responsive'>";
		echo "<table id=testtable class='w3-table-all w3-centered w3-border w3-small'>";
		echo "<tr class='w3-border'>";

		foreach($schedules_hdg as $key => $value) {
				//print_r($schedules_hdg);
				echo "<th class='w3-border'>";
				
				if($key === "slot_time") {
					echo "SLOT";
				} else {
					//print_r($key);
					echo $key;
				}
				echo "</th>";
		}
		echo "</tr>";
		$test_counter = 1;

		foreach($schedules as $schedule) {
			//print_r($schedule);

			echo "<tr>";
			
			foreach($schedule as $sched_key => $sched_value) {
				$date_row = $schedule['date'];
				$slot_time = $schedule['slot_time'];
				$slot_id = $schedule['slot_id'];
				$aircraft_reg = $sched_key;

				echo "<td id='td$test_counter$schedule_date' class='w3-border'>";

				if($sched_value == NULL) {
					echo "<p>None</p>";
					echo "<button onclick=openEditModal('" 
						.$aircraft_reg.
						"','"
						.$schedule_date.
						"','"
						.$slot_id.
						"','"
						.$slot_time.
						"','"
						.json_encode([ 'students' => $students]).
						"','"
						.json_encode([ 'instructors' => $instructors]).
						"','"
						.json_encode([ 'purpose' => $purposes])
						."','td$test_counter$schedule_date') class=\"w3-button w3-red w3-small\">REQUEST SCHEDULE</button>";
					//echo "<p><button onclick=\"document.getElementById('id01').style.display='block'\" class=\"w3-button w3-blue w3-small\">EDIT</button></p>";
				} else if (ctype_digit($sched_value) && $sched_key <> 'slot_time')  { 
					
					
					$schedule_detail = $database->getScheduleDetails($sched_value);
					$instructor = $schedule_detail['instructor'];
					$student = $schedule_detail['student'];
					$purpose = $schedule_detail['purpose'];
					$instructor_id = $schedule_detail['instructor_id'];
					$student_id = $schedule_detail['student_id'];
					$purpose_id = $schedule_detail['purpose_id'];
					echo "<p>" . "CAPT. " . $instructor . "</p>";
					echo "<p>" . "STUDENT: " . $student . "</p>";
					echo "<p>" . "PURPOSE: " . $purpose . "</p>";
					echo "<button onclick=openEditModal('" 
						.$aircraft_reg.
						"','"
						.$schedule_date.
						"','"
						.$slot_id.
						"','"
						.$slot_time.
						"','"
						.json_encode(['student_id' => $student_id,'students' => $students]).
						"','"
						.json_encode(['instructor_id' => $instructor_id,'instructors' => $instructors]).
						"','"
						.json_encode(['purpose_id' => $purpose_id,'purpose' => $purposes])
						."','td$test_counter$schedule_date') class=\"w3-button w3-red w3-small\">REQUEST SCHEDULE</button>"; 		
				} else if($sched_value =='CANCELLED') {
					echo "<p>" . $sched_value . "</p>";
					echo "<button onclick=openEditModal('" 
						.$aircraft_reg.
						"','"
						.$schedule_date.
						"','"
						.$slot_id.
						"','"
						.$slot_time.
						"','"
						.json_encode([ 'students' => $students]).
						"','"
						.json_encode([ 'instructors' => $instructors]).
						"','"
						.json_encode([ 'purpose' => $purposes])
						."','td$test_counter$schedule_date') class=\"w3-button w3-red w3-small\">REQUEST SCHEDULE</button>";
				} else {
					echo "<p>" . $sched_value . "</p>";
				}

				echo "</td>";
				$test_counter++;
			}
			echo "</tr>";
			
		}
		echo "</table>";
		echo "</div>";
		echo "</header>";
		unset($database);
	}

	function generateScheduleTable($schedule_date) {
		echo "<div class='w3-container '><h2>SCHEDULE DATE: " . $schedule_date . "</h2></div>";
		echo "<header class='w3-container w3-margin-bottom w3-center w3-white' id='home'>";

		$database = new Database();
		$database->connectDB();
		$schedules =  $database->getSchedules($schedule_date);
		$schedules_hdg = $schedules[0];
		$students =  $database->getStudents(1);
		$instructors =  $database->getInstructors();
		$purposes =  $database->getPurpose();
		//print_r($schedules);
		echo "<div class='w3-responsive'>";
		echo "<table id=testtable class='w3-table-all w3-centered w3-border w3-small'>";
		echo "<tr class='w3-border'>";

		foreach($schedules_hdg as $key => $value) {
				//print_r($schedules_hdg);
				echo "<th class='w3-border'>";
				
				if($key === "slot_time") {
					echo "SLOT";
				} else {
					//print_r($key);
					echo $key;
				}
				echo "</th>";
		}
		echo "</tr>";
		$test_counter = 1;

		foreach($schedules as $schedule) {
			//print_r($schedule);

			echo "<tr>";
			
			foreach($schedule as $sched_key => $sched_value) {
				$date_row = $schedule['date'];
				$slot_time = $schedule['slot_time'];
				$slot_id = $schedule['slot_id'];
				$aircraft_reg = $sched_key;

				echo "<td id='td$test_counter$schedule_date' class='w3-border'>";

				if($sched_value == NULL) {
					echo "<p>None</p>";
					echo "<button onclick=openEditModal('" 
						.$aircraft_reg.
						"','"
						.$schedule_date.
						"','"
						.$slot_id.
						"','"
						.$slot_time.
						"','"
						.json_encode([ 'students' => $students]).
						"','"
						.json_encode([ 'instructors' => $instructors]).
						"','"
						.json_encode([ 'purpose' => $purposes])
						."','td$test_counter$schedule_date') class=\"w3-button w3-red w3-small\">EDIT SCHEDULE</button>";
					//echo "<p><button onclick=\"document.getElementById('id01').style.display='block'\" class=\"w3-button w3-blue w3-small\">EDIT</button></p>";
				} else if (ctype_digit($sched_value) && $sched_key <> 'slot_time')  { 
					
					
					$schedule_detail = $database->getScheduleDetails($sched_value);
					$instructor = $schedule_detail['instructor'];
					$student = $schedule_detail['student'];
					$purpose = $schedule_detail['purpose'];
					$instructor_id = $schedule_detail['instructor_id'];
					$student_id = $schedule_detail['student_id'];
					$purpose_id = $schedule_detail['purpose_id'];
					echo "<p>" . "CAPT. " . $instructor . "</p>";
					echo "<p>" . "STUDENT: " . $student . "</p>";
					echo "<p>" . "PURPOSE: " . $purpose . "</p>";
					echo "<button onclick=openEditModal('" 
						.$aircraft_reg.
						"','"
						.$schedule_date.
						"','"
						.$slot_id.
						"','"
						.$slot_time.
						"','"
						.json_encode(['student_id' => $student_id,'students' => $students]).
						"','"
						.json_encode(['instructor_id' => $instructor_id,'instructors' => $instructors]).
						"','"
						.json_encode(['purpose_id' => $purpose_id,'purpose' => $purposes])
						."','td$test_counter$schedule_date') class=\"w3-button w3-red w3-small\">EDIT SCHEDULE</button>"; 		
				} else if($sched_value =='CANCELLED') {
					echo "<p>" . $sched_value . "</p>";
					echo "<button onclick=openEditModal('" 
						.$aircraft_reg.
						"','"
						.$schedule_date.
						"','"
						.$slot_id.
						"','"
						.$slot_time.
						"','"
						.json_encode([ 'students' => $students]).
						"','"
						.json_encode([ 'instructors' => $instructors]).
						"','"
						.json_encode([ 'purpose' => $purposes])
						."','td$test_counter$schedule_date') class=\"w3-button w3-red w3-small\">EDIT SCHEDULE</button>";
				} else {
					echo "<p>" . $sched_value . "</p>";
				}

				echo "</td>";
				$test_counter++;
			}
			echo "</tr>";
			
		}
		echo "</table>";
		echo "</div>";
		echo "</header>";
		unset($database);
	}

	function generateGroundScheduleTable($view = "home") {
		$database = new Database();
		$database->connectDB();	
		$gs =  $database->getGroundSchedule();

		//print_r($gs);

		echo "<table class='w3-table-all w3-centered w3-border w3-small'>";
		echo "<tr class='w3-border'>";
			echo "<th class='w3-border'>";
			echo "CLASSROOM A";
			echo "</th>";
			echo "<th class='w3-border'>";
			echo "CLASSROOM B";
			echo "</th>";
		echo "</tr>";

		$counter = 1;
		foreach($gs as $g) {
			$json_test = htmlentities(json_encode($g));
			$gs_id = $g[0];
			$classroom_a = $g[1];
			$classroom_b = $g[2];
			
			echo "<tr id='tr-gs-" .$counter. "' class='w3-border'>";
			echo "<td id='td-gs-a-" .$counter. "' class='w3-border'>";
			echo "<textarea class='w3-input' rows='10' style='resize:none' disabled=true>";
			echo $g[1];
			echo "</textarea>";
			echo "</td>";
			echo "<td id='td-gs-b-" .$counter. "' class='w3-border'>";
			echo "<textarea class='w3-input' rows='10' style='resize:none' disabled=true>";
			echo $g[2];
			echo "</textarea>";
			echo "</td>";
			echo "<td class='w3-border'>";

			if($view == 'home')
			echo "
				<button onclick=\"openAddEditModal('gs_view', 'edit',$json_test)\">
									EDIT
									</button>

			";



			echo "</td>";
			echo "</tr>";
			$counter++;
		}
		echo "</table>";
	}

	function generateIndexScheduleTable($schedule_date) {
		//remove w3-border
		echo "<div class='w3-container '><h2>SCHEDULE DATE: " . $schedule_date . "</h2></div>";
		echo "<header class='w3-container w3-center w3-white' id='home'>";
		//remove w3-padding-32
		$database = new Database();
		$database->connectDB();
		$schedules =  $database->getSchedules($schedule_date);
		$schedules_hdg = $schedules[0];
		$students =  $database->getStudents();
		$instructors =  $database->getInstructors();
		$purposes =  $database->getPurpose();
		
		echo "<div class='w3-responsive'>";
		echo "<table id=testtable class='w3-table-all w3-centered w3-border w3-small'>";
		echo "<tr class='w3-border'>";
		foreach($schedules_hdg as $key => $value) {
				echo "<th class='w3-border'>";
				
				if($key === "slot_time") {
					echo "SLOT";
				} else {
					echo $key;
				}
				echo "</th>";
		}
		echo "</tr>";

		foreach($schedules as $schedule) {
			
			echo "<tr>";
			
			foreach($schedule as $sched_key => $sched_value) {
				$date_row = $schedule['date'];
				$slot_time = $schedule['slot_time'];
				$slot_id = $schedule['slot_id'];
				$aircraft_reg = $sched_key;

				echo "<td class='w3-border'>";

				if($sched_value == NULL) {
					echo "None";
				} else if (ctype_digit($sched_value) && $sched_key <> 'slot_time')  {
					$schedule_detail = $database->getScheduleDetails($sched_value);
					$instructor = $schedule_detail['instructor'];
					$student = $schedule_detail['student'];
					$purpose = $schedule_detail['purpose'];
					$instructor_id = $schedule_detail['instructor_id'];
					$student_id = $schedule_detail['student_id'];
					$purpose_id = $schedule_detail['purpose_id'];
					echo "<p>" . "CAPT. " . $instructor . "</p>";
					echo "<p>" . "STUDENT: " . $student . "</p>";
					echo "<p>" . "PURPOSE: " . $purpose . "</p>";			
				} else {
					echo "<p>" . $sched_value . "</p>";
				}

				echo "</td>";
			}
			echo "</tr>";
		}
		echo "</table>";
		echo "</div>";
		echo "</header>";
		unset($database);
	}

	function generateStudentsTable() {
		$database = new Database();
		$database->connectDB();

		echo "<header class='w3-container w3-padding-32 w3-center w3-white' id='home'>";
		echo "<div class='w3-responsive'>";
		echo "<table id=studentstable class='w3-table-all w3-centered w3-border w3-tiny'>";

		$students =  $database->getStudents(2);
		echo "<tr class='w3-border'>";
		echo "<th class='w3-border'>Student ID</th>";
		echo "<th class='w3-border'>First Name</th>";
		echo "<th class='w3-border'>Middle Name</th>";
		echo "<th class='w3-border'>Last Name</th>";
		echo "<th class='w3-border'>Active</th>";
		echo "<th class='w3-border'>Edit</th>";
		echo "</tr>";
		
		foreach($students as $student) {
			//print_r($student); echo "</br>";
			$json_test = htmlentities(json_encode($student));
			echo "<tr>";
			
			$counter_for_active = 1;
			$student_id = "";
			$json_student = json_encode($student);
			foreach($student as $student_detail) {
				echo "<td class='w3-border'><p>";
				if($counter_for_active == 5) {
					$is_active_checked = $student_detail == '1' ? 'CHECKED' : '';

					echo "<input id='$json_test' class='active_student' type = 'checkbox' name='var1' $is_active_checked>";
				} else if($counter_for_active == 1) {
					echo $student_id = $student_detail;
			 	} else {
					echo $student_detail;
				}
				echo "</p></td>";			
				$counter_for_active++;
			}
			echo "<td>";
			echo "<p>
					<button onclick=\"openAddEditModal('students_table_view', 'edit',$json_test)\">
					EDIT
					</button>
				  </p>";
			echo"</td>";
			echo "</tr>";
		}		
		echo "</table>";
		echo "</div>";
		echo "</header>";
	}

	function generateInstructorsTable() {
		$database = new Database();
		$database->connectDB();

		echo "<header class='w3-container w3-padding-32 w3-center w3-white' id='home'>";
		echo "<div class='w3-responsive'>";
		echo "<table id=studentstable class='w3-table-all w3-centered w3-border w3-tiny'>";

		$instructors =  $database->getInstructors();
		echo "<tr class='w3-border'>";
		echo "<th class='w3-border'>INSTRUCTOR ID</th>";
		echo "<th class='w3-border'>FIRST NAME</th>";
		echo "<th class='w3-border'>MIDDLE NAME</th>";
		echo "<th class='w3-border'>LAST NAME</th>";
		echo "<th class='w3-border'>Active</th>";
		echo "<th class='w3-border'>EDIT</th>";
		echo "</tr>";
		

		foreach($instructors as $instructor) {
			//print_r($student); echo "</br>";
			echo "<tr>";
			$json_test = htmlentities(json_encode($instructor));
			$counter_for_active = 1;
			$instructor_id = "";	
			/*		
			foreach($instructor as $instructor_detail) {
				echo "<td class='w3-border'>";
				echo "<p>" . $instructor_detail . "</p>";
				echo "</td>";

				$counter_for_active++;
			} */

			foreach($instructor as $instructor_detail) {
				echo "<td class='w3-border'><p>";
				if($counter_for_active == 5) {
					$is_active_checked = $instructor_detail == '1' ? 'CHECKED' : '';

					echo "<input id='$json_test' class='active_instructor' type = 'checkbox' name='var1' $is_active_checked>";
				} else if($counter_for_active == 1) {
					echo $instructor_id = $instructor_detail;
			 	} else {
					echo $instructor_detail;
				}
				echo "</p></td>";			
				$counter_for_active++;
			}

			echo "<td>";
			echo "<p>
					<button onclick=\"openAddEditModal('instructors_table_view', 'edit',$json_test)\">
					EDIT
					</button>
				  </p>";
			echo"</td>";
			echo "</tr>";
		}		
		echo "</table>";
		echo "</div>";
		echo "</header>";
	}

	function generateSlotTable() {
		$database = new Database();
		$database->connectDB();

		echo "<header class='w3-container w3-padding-32 w3-center w3-white' id='home'>";
		echo "<div class='w3-responsive'>";
		echo "<table id=studentstable class='w3-table-all w3-centered w3-border w3-tiny'>";

		$slots =  $database->getSlots();
		echo "<tr class='w3-border'>";
		echo "<th class='w3-border'>SLOT ID</th>";
		echo "<th class='w3-border'>SLOT</th>";
		echo "<th class='w3-border'>EDIT</th>";
		echo "<th class='w3-border'>Active</th>";
		echo "</tr>";
		
		foreach($slots as $slot) {
			$json_test = htmlentities(json_encode($slot));
			echo "<tr>";

			echo "<td class='w3-border'>";
			echo "<p>" . $slot[0] . "</p>";
			echo "</td>";		

			echo "<td class='w3-border'>";
			echo "<p>" . $slot[1] . "</p>";
			echo "</td>";		

			echo "<td class='w3-border'>";
			echo "<p><button onclick=openAddEditModal('edit_slot_view','edit',$json_test) class=\"w3-button w3-panel w3-blue w3-small w3-center w3-border w3-round-xlarge \">EDIT</button></p>";
			echo"</td>";

			echo "<td>";
			if($slot[2] == 1) {
				echo "<input id='$slot[0]' class='active_slot' type = 'checkbox' name='1' CHECKED>";
			} else {
				echo "<input id='$slot[0]' class='active_slot' type = 'checkbox' name='1' >";
			}
			echo "</td>";

			echo "</tr>";
		}
				
		echo "</table>";
		echo "</div>";
		echo "</header>";
	}

	function generateAircraftTable() {
		$database = new Database();
		$database->connectDB();

		echo "<header class='w3-container w3-padding-32 w3-center w3-white' id='home'>";
		echo "<div class='w3-responsive'>";
		echo "<table id=studentstable class='w3-table-all w3-centered w3-border w3-tiny'>";

		$aircrafts =  $database->getAircrafts();
		echo "<tr class='w3-border'>";
		echo "<th class='w3-border'>AIRCRAFT ID</th>";
		echo "<th class='w3-border'>REGISTRATION</th>";
		echo "<th class='w3-border'>ACTIVE</th>";
		echo "<th class='w3-border'>BASIC EMPTY WEIGHT</th>";
		echo "<th class='w3-border'>EDIT</th>";
		echo "</tr>";
		
		foreach($aircrafts as $aircraft) {
			//print_r($student); echo "</br>";
			$json_test = htmlentities(json_encode($aircraft));
			echo "<tr>";
			
			$i = 1;
			$aircraft_regis = "";
			foreach($aircraft as $aircraft_detail) {
				echo "<td class='w3-border'>";

				if($i == 1) {
					$aircraft_regis = $aircraft_detail;
				}
				if($i==3) {
					if($aircraft_detail == 1) {
						echo "<input id='$aircraft_regis' class='active_airact' type = 'checkbox' name='var1' CHECKED>";
					} else {
						echo "<input id='$aircraft_regis' class='active_airact' type = 'checkbox' name='var1' >";
					}					
				} else {
					echo "<p>" . $aircraft_detail . "</p>";
				}

				echo "</td>";

				$i++;
			}
			echo "<td>";
			echo "<p>
					<button onclick=\"openAddEditModal('ac_table_view', 'edit',$json_test)\">
					EDIT
					</button>
				</p>";
			echo"</td>";
			echo "</tr>";
		}		
		echo "</table>";
		echo "</div>";
		echo "</header>";
	}
}

?>